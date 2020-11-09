import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { UsersService } from '@gh-search/gh/data-access';
import { map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';

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

    <gh-search-user
      *ngFor="let user of users$ | async"
      [user]="user"
    ></gh-search-user>
  `,
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  submit$ = new Subject();
  searchForm = new FormGroup({
    query: new FormControl(''),
  });

  users$ = this.submit$.pipe(
    withLatestFrom(this.searchForm.valueChanges),
    map(([_, formValue]) => formValue),
    switchMap(({ query }) => this.ghUsersService.searchUsers(query)),
    startWith([])
  );

  constructor(private ghUsersService: UsersService) {}
}
