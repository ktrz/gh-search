import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@gh-search/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'gh-search-login',
  template: `
    <mat-card>
      <mat-card-title>
        Login
      </mat-card-title>
      <mat-card-content>
        <form [formGroup]="loginForm">
          <mat-form-field>
            <mat-label>GitHub access token</mat-label>
            <input
              matInput
              placeholder="Enter your GH token"
              formControlName="ghToken"
              required
            />
            <mat-error *ngIf="loginForm.controls.ghToken.invalid"
              >Invalid token</mat-error
            >
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="login()">
          Login
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    ghToken: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.authenticate(this.loginForm.value.ghToken);
    this.router.navigateByUrl('/');
  }
}
