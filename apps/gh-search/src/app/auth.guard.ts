import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '@gh-search/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return of(route.queryParams.ghToken).pipe(
      tap((token) => {
        if (token) {
          this.authService.setToken(token);
        }
      }),
      switchMap(() => this.authService.isAuthenticated()),
      map((isAuthenticated) =>
        isAuthenticated
          ? this.router.parseUrl('/')
          : this.router.parseUrl('/login')
      )
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return of(childRoute.queryParams.ghToken).pipe(
      tap((token) => {
        if (token) {
          this.authService.setToken(token);
        }
      }),
      switchMap(() => this.authService.isAuthenticated()),
      map((isAuthenticated) =>
        isAuthenticated
          ? this.router.parseUrl('/')
          : this.router.parseUrl('/login')
      )
    );
  }
}
