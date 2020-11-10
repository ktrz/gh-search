import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { AuthService } from '@gh-search/auth';
import { Subject } from 'rxjs';

@Injectable()
export class LoggedInService implements OnDestroy {
  private destroy = new Subject();
  private isAuth$ = this.authService
    .isAuthenticated()
    .pipe(takeUntil(this.destroy));
  private logout$ = this.isAuth$.pipe(
    filter((auth) => !auth),
    tap(() => {
      this.router.navigateByUrl('/login');
    })
  );

  constructor(private router: Router, private authService: AuthService) {
    this.logout$.subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}
