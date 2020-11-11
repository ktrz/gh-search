# Git Hub Search

## Frontend

The project contains Angular app which allows user to search for GitHub users. It uses [GraphQL API](https://docs.github.com/en/free-pro-team@latest/graphql)

To run the frontend app in development mode you need to set `clientId` inside of `apps/gh-search/src/environments/environment.ts` file to your own OAuth GitHub app ([GH dev settings](https://github.com/settings/developers)).
```
export const environment = {
  production: false,
  clientId: '<your-gh-client-id>',
  authRedirectUrl: 'http://localhost:3333/auth',
  ghAuthorizeUrl: 'https://github.com/login/oauth/authorize',
};
```
The `clientSecret` will be used by BE app to generate user access tokens.
Then just run `ng serve gh-search` to start development app. Navigate to [localhost:4200](http://localhost:4200) to see the app.

To login to the running app you can either login via your GitHub account or you can generate your [personal access token](https://github.com/settings/tokens) and use it in the login input provided.


## Backend

The backend project contains a NodeJS express app which is responsible for generating access tokens for user using [Web application flow](https://docs.github.com/en/free-pro-team@latest/developers/apps/authorizing-oauth-apps).

To run the app locally you need to create a `.env` file in the repo root directory with the following env variables
```
GH_CLIENT_SECRET=<your-gh-client-secret>
```

Then just run `ng serve gh-search-token-auth` to start development server.

You can check that server is working correctly by going to [localhost:3333/debug](http://localhost:3333/debug)
