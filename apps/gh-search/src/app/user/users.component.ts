import { Component, Input } from '@angular/core';
import { User } from '@gh-search/gh/data-access';

@Component({
  selector: 'gh-search-users',
  template: `
    <div class="users-container" *ngIf="users">
      <gh-search-user
        *ngFor="let user of users"
        [user]="user"
        class="user"
      ></gh-search-user>
    </div>
  `,
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  @Input() users: User[] | null = null;
}
