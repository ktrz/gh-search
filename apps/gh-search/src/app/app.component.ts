import { Component } from '@angular/core';
import { LoggedInService } from './logged-in.service';

@Component({
  selector: 'gh-search-root',
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  providers: [LoggedInService],
})
export class AppComponent {
  constructor(loggedInService: LoggedInService) {}
}
