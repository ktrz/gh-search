import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { User } from './user.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchUsers } from './user.graphql';
import { SearchUsersResult, SearchUsersVariables } from './user.api';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apollo: Apollo) {}

  searchUsers(
    query: string,
    after?: string,
    pageSize = 100
  ): Observable<User[]> {
    return this.apollo
      .watchQuery<SearchUsersResult, SearchUsersVariables>({
        query: SearchUsers,
        variables: {
          query,
          pageSize,
          after,
        },
      })
      .valueChanges.pipe(
        map((data) =>
          data.data.search.nodes.map((apiUser) => ({
            name: apiUser.name,
            followersCount: apiUser.followers.totalCount,
            gistsCount: apiUser.gists.totalCount,
          }))
        )
      );
  }
}
