import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/entities.interface';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private token = null;

  register(user: User): Observable<User> {
    return this.httpClient.post<User>('/api/auth/register', user);
  }

  login(user: User): Observable<{token: string}> {
    return this.httpClient.post<{token: string}>('/api/auth/login', user).pipe(
      tap(({token}) => {
        localStorage.setItem('auth-token', token);
        this.setToken(token);
      })
    );
  }

  logout() {
    this.setToken(null);
    localStorage.removeItem('auth-token');
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

}
