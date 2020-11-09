import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { User } from './user.model';
import { filter, map, pluck, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { SearchUsers } from './user.graphql';
import { ApiUser, SearchUsersResult, SearchUsersVariables } from './user.api';

interface PageInfo {
  pageIndex: number;
  pageSize: number;
}

const toUser = (api: ApiUser) => {
  switch (api.__typename) {
    case 'User':
      return new User(api.name, api.avatarUrl, api.followers.totalCount, api.gists.totalCount);
  }
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private pageSubject = new BehaviorSubject<PageInfo>({ pageSize: 10, pageIndex: 0 });

  private searchParams$ = new ReplaySubject<SearchUsersVariables>();
  private query$ = this.searchParams$.pipe(
    map(variables => this.apollo
      .watchQuery<SearchUsersResult, SearchUsersVariables>({
        query: SearchUsers,
        variables,
        useInitialLoading: true,
        notifyOnNetworkStatusChange: true
      })),
    shareReplay(1));
  private valueChanges$ = this.query$.pipe(switchMap(query => query.valueChanges));
  private loadedValues$ = this.valueChanges$.pipe(filter(result => !result.loading && !!result.data));

  private page$ = this.pageSubject.asObservable().pipe(
    withLatestFrom(this.valueChanges$, this.query$),
    tap(([{ pageSize, pageIndex }, result, query]) => {
      if (result.loading || !result.data) {
        return;
      }
      if (pageIndex * pageSize >= result.data.search.nodes.length) {
        query.fetchMore({
          variables: {
            after: result.data.search.pageInfo.endCursor
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult || prev.search.pageInfo.endCursor === fetchMoreResult.search.pageInfo.endCursor) {
              return prev;
            }
            return {
              ...prev,
              rateLimit: fetchMoreResult.rateLimit,
              search: {
                ...prev.search,
                pageInfo: {
                  ...prev.search.pageInfo,
                  endCursor: fetchMoreResult.search.pageInfo.endCursor,
                  hasNextPage: fetchMoreResult.search.pageInfo.hasNextPage
                },
                userCount: fetchMoreResult.search.userCount,
                nodes: [
                  ...prev.search.nodes,
                  ...fetchMoreResult.search.nodes
                ]
              }

            };
          }
        });
      }
    }),
    map(([page]) => page),
    startWith(this.pageSubject.value),
    shareReplay(1)
  );

  constructor(private apollo: Apollo) {}

  getUsers(): Observable<User[]> {
    return combineLatest([
      this.getApiUsers(),
      this.page$
    ])
      .pipe(
        map(([users, { pageSize, pageIndex }]) => users.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)));
  }

  getUsersCount(): Observable<number> {
    return this.loadedValues$.pipe(
      map(data => data.data.search.userCount)
    );
  }

  isLoading(): Observable<boolean> {
    return this.valueChanges$.pipe(
      map(data => data.loading)
    );
  }

  getPageSize(): Observable<number> {
    return this.page$.pipe(pluck('pageSize'));
  }


  getPageIndex(): Observable<number>  {
    return this.page$.pipe(pluck('pageIndex'));
  }

  changePage(pageIndex: number, pageSize: number) {
    this.pageSubject.next({
      pageSize,
      pageIndex
    });
  }

  searchUsers(
    query: string,
    after?: string
  ): void {
    const additionalQueryParams = ['type:user'];
    this.pageSubject.next({ pageIndex: 0, pageSize: this.pageSubject.value.pageSize });
    this.searchParams$.next({
      query: `${[query, ...additionalQueryParams].join(' ')}`,
      after,
      pageSize: 100
    });
  }

  private getApiUsers() {
    return this.loadedValues$.pipe(
      map((data) => data.data.search.nodes.map(toUser)),
    );
  }
}
