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
} from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { AuthService } from '@gh-search/auth';
import { map, switchMap, take } from 'rxjs/operators';
import { toRxObservable, toZenObservable } from '@gh-search/observable-util';

const uri = 'https://api.github.com/graphql';

export function createApollo(
  httpLink: HttpLink,
  authService: AuthService
): ApolloClientOptions<NormalizedCacheObject> {
  return {
    link: from([
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
    ]),
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
