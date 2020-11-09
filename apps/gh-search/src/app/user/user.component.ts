import { Component, Input } from '@angular/core';
import { User } from '@gh-search/gh/data-access';

@Component({
  selector: 'gh-search-user',
  template: `
    <mat-card *ngIf="user">
      <mat-card-title>{{ user.name || defaultName }}</mat-card-title>
      <mat-card-content>
        <div>Followers: {{ user.followersCount }}</div>
        <div>Gists: {{ user.gistsCount }}</div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  readonly defaultName = '<No name>';

  @Input() user?: User;
}
