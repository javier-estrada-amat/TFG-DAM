import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LoginResponse } from './models/login-response.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const url = `${environment.apiPath}auth/login`;
    return this.http.post<LoginResponse>(url, { email, password });
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  cambiarPassword(email: string, nuevaPassword: string): Observable<any> {
    const url = `${environment.apiPath}auth/cambiar-password`;
    return this.http.post(url, { email, nuevaPassword });
  }

getUserRoles(): string[] {
  const token = this.getToken();
  if (!token) return [];
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const roles: string[] = payload.roles || [];
    return roles.map(r => r.replace(/^ROLE_/, ''));
  } catch {
    return [];
  }
}

  hasRole(rol: string): boolean {
    return this.getUserRoles().includes(rol);
  }

  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.getUserRoles();
    return roles.some(r => userRoles.includes(r));
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']);
  }
}
