import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import {
  ApolloClientOptions,
  ApolloLink,
  from,
  InMemoryCache,
  NextLink,
  NormalizedCacheObject,
  Operation,
  ServerError,
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { AuthService } from '@gh-search/auth';
import { map, switchMap, take } from 'rxjs/operators';
import { toRxObservable, toZenObservable } from '@gh-search/observable-util';
import { onError } from '@apollo/client/link/error';
import { ServerParseError } from '@apollo/client/link/http';

const uri = 'https://api.github.com/graphql';

export function createApollo(
  httpLink: HttpLink,
  authService: AuthService
): ApolloClientOptions<NormalizedCacheObject> {
  const isNetworkError = (
    error?: Error | ServerError | ServerParseError
  ): error is ServerError | ServerParseError =>
    !!error && error.hasOwnProperty('statusCode');
  const hasStatus = (error?: any): error is { status: number } =>
    !!error && error.hasOwnProperty('status');

  const logoutLink = onError(({ networkError }) => {
    if (isNetworkError(networkError) && networkError.statusCode === 401) {
      authService.logout();
    }
    if (hasStatus(networkError) && networkError.status === 401) {
      authService.logout();
    }
  });

  return {
    link: logoutLink.concat(
      from([
        new ApolloLink((operation: Operation, forward: NextLink) => {
          return toZenObservable(
            authService.getAuthToken().pipe(
              take(1),
              map((token) => {
                operation.setContext(({ headers = {} }) => ({
                  headers: {
                    ...headers,
                    Authorization: `Bearer ${token}`,
                  },
                }));
                return operation;
              }),
              switchMap((operation) => toRxObservable(forward(operation)))
            )
          );
        }),
        httpLink.create({ uri }),
      ])
    ),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, AuthService],
    },
  ],
})
export class GraphQLModule {}
