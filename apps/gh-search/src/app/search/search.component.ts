import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { User, UsersService } from '@gh-search/gh/data-access';
import { map, shareReplay, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'gh-search-search',
  template: `
    <form [formGroup]="searchForm" (ngSubmit)="submit$.next()">
      <mat-card>
        <mat-form-field>
          <input matInput formControlName="query" placeholder="ie. example" />
        </mat-form-field>

        <button mat-raised-button>Search</button>
      </mat-card>
    </form>

    <mat-paginator [length]="pageLength$ | async"
                   [pageSize]="pageSize$ | async"
                   [pageIndex]="pageIndex$ | async"
                   [pageSizeOptions]="[5, 10, 25, 100]"
                   (page)="onPageChanged($event)"
    ></mat-paginator>

    <ng-container *ngIf="isLoading$ | async; then loading; else data"></ng-container>
    <ng-template #loading>
      Loading...
    </ng-template>
    <ng-template #data>
      <gh-search-users [users]="users$ | async"></gh-search-users>
    </ng-template>
  `,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  submit$ = new Subject();
  searchForm = new FormGroup({
    query: new FormControl('')
  });

  searchUser$ = this.submit$.pipe(
    withLatestFrom(this.searchForm.valueChanges),
    map(([_, formValue]) => formValue),
    startWith(this.searchForm.value),
    tap(({ query }) => this.ghUsersService.searchUsers(query)),
    shareReplay(1)
  );

  pageLength$ = this.searchUser$.pipe(
    switchMap(() => this.ghUsersService.getUsersCount())
  );
  pageSize$ = this.ghUsersService.getPageSize();
  pageIndex$ = this.ghUsersService.getPageIndex();
  isLoading$ = this.ghUsersService.isLoading();

  users$ = this.searchUser$.pipe(
    switchMap(() => this.ghUsersService.getUsers()),
    startWith([] as User[])
  );

  constructor(private ghUsersService: UsersService) {}

  onPageChanged({ pageSize, pageIndex }: PageEvent) {
    this.ghUsersService.changePage(pageIndex, pageSize);
  }
}
