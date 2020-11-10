import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type GhToken = NonNullable<string> | null;
const ghTokenKey = 'ghToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authToken$ = new BehaviorSubject<GhToken>(
    localStorage.getItem(ghTokenKey)
  );

  isAuthenticated(): Observable<boolean> {
    return this.getAuthToken().pipe(map((token) => !!token));
  }

  getAuthToken(): Observable<GhToken> {
    return this.authToken$.asObservable();
  }

  setToken(ghToken: string) {
    localStorage.setItem(ghTokenKey, ghToken);
    this.authToken$.next(ghToken);
  }

  logout() {
    this.authToken$.next(null);
    localStorage.removeItem(ghTokenKey);
  }
}
