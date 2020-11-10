import { Component, Input } from '@angular/core';
import { User } from '@gh-search/gh/data-access';

@Component({
  selector: 'gh-search-user',
  template: `
    <mat-card *ngIf="user">
      <mat-card-header>
        <img [src]="user.avatarUrl" alt="User avatar" mat-card-avatar />
        <mat-card-title>
          <a [href]="user.url" target="_blank">{{ user.login }}</a>
          {{ user.name && '(' + user.name + ')' }}</mat-card-title
        >
        <mat-card-subtitle>
          <div>Location: {{ user.location }}</div>
          <div>Followers: {{ user.followersCount }}</div>
          <div>Gists: {{ user.gistsCount }}</div>
        </mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        {{ user.bio }}
      </mat-card-content>

      <mat-card-actions>
        <a mat-button [href]="user.apiUrl" target="_blank">API data</a>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  readonly defaultName = '<No name>';

  @Input() user?: User;
}
