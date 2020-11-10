import * as express from 'express';
import { ajax } from 'rxjs/ajax';
import { catchError, first, tap } from 'rxjs/operators';
import { XMLHttpRequest } from 'xmlhttprequest';
import { EMPTY } from 'rxjs';
import { environment } from './environments/environment';
import * as dotenv from 'dotenv';

dotenv.config();

function createXHR() {
  return new XMLHttpRequest();
}

const app = express();

const clientSecret = process.env.GH_CLIENT_SECRET || '';
const clientId = process.env.GH_CLIENT_ID || environment.clientId;
const appUrl = process.env.FE_APP_URL || environment.appUrl;

app.get('/auth', (req, res) => {
  console.log(req.query);

  const code = req.query.code;

  ajax({
    createXHR,
    url: `https://github.com/login/oauth/access_token`,
    headers: {
      accept: 'application/json',
    },
    method: 'POST',
    crossDomain: true,
    body: {
      client_id: clientId,
      client_secret: clientSecret,
      code,
    },
  })
    .pipe(
      tap(
        (response) => {
          if (response.status === 200 && response.response.access_token) {
            res.redirect(`${appUrl}?ghToken=${response.response.access_token}`);
          } else {
            console.warn(response);
            res.status(400).send(response.response);
          }
        },
        catchError((error) => {
          console.warn(error);
          res.status(400).send(error);
          return EMPTY;
        })
      ),
      first()
    )
    .subscribe();
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/auth`);
});
server.on('error', console.error);
