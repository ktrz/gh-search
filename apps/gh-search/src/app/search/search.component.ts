import { Component } from '@angular/core';
import { gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';

const SearchUsers = gql`
  query SearchUsers {
    rateLimit {
      limit
      remaining
      cost
    }
    search(
      type: USER
      query: "example"
      first: 100
      after: "Y3Vyc29yOjEwMA=="
    ) {
      userCount
      nodes {
        ... on User {
          name
          followers {
            totalCount
          }
          gists {
            totalCount
          }
        }
      }
    }
  }
`;

@Component({
  selector: 'gh-search-search',
  template: `
    <mat-card>
      {{ users$ | async | json }}
    </mat-card>
  `,
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  users$ = this.apollo.watchQuery<any>({
    query: SearchUsers,
  }).valueChanges;

  constructor(private apollo: Apollo) {}
}
