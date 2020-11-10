import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@gh-search/auth';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'gh-search-login',
  template: `
    <mat-card>
      <mat-card-title>
        Login
      </mat-card-title>
      <mat-card-content>
        <div class="login-container">
          <div class="login-column">
            <button
              mat-raised-button
              color="primary"
              (click)="loginWithGitHub()"
            >
              Login with Github
            </button>
          </div>
          <form [formGroup]="loginForm" class="login-column">
            <mat-form-field>
              <mat-label>GH personal access token</mat-label>
              <input
                matInput
                placeholder="Enter your personal access token"
                formControlName="ghToken"
                required
              />
              <mat-error *ngIf="loginForm.controls.ghToken.invalid"
                >Invalid token</mat-error
              >
            </mat-form-field>
            <button
              mat-raised-button
              color="primary"
              (click)="loginWithToken()"
            >
              Login
            </button>
          </form>
        </div>
      </mat-card-content>
      <mat-card-actions> </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    ghToken: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  loginWithGitHub() {
    const queryParams = {
      client_id: environment.clientId,
      redirect_uri: environment.authRedirectUrl,
    };
    type QueryParams = typeof queryParams;
    type QueryParamsKeys = keyof QueryParams;

    const queryParamsString = (Object.keys(queryParams) as QueryParamsKeys[])
      .map((key: keyof QueryParams) => [
        key,
        encodeURIComponent(queryParams[key]),
      ])
      .map((param) => param.join('='))
      .join('&');

    window.location.href = `${environment.ghAuthorizeUrl}?${queryParamsString}`;
  }

  loginWithToken() {
    this.authService.setToken(this.loginForm.value.ghToken);
    this.router.navigateByUrl('/');
  }
}
