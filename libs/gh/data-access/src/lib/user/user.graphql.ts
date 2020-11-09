import { gql } from '@apollo/client/core';

export const SearchUsers = gql`
  query SearchUsers($query: String!, $pageSize: Int!, $after: String) {
    rateLimit {
      limit
      remaining
      cost
    }
    search(type: USER, query: $query, first: $pageSize, after: $after) {
      userCount
      pageInfo {
        hasNextPage
        endCursor
      }
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
