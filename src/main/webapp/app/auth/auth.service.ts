import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ code: number, token: string, primerAcceso: boolean }> {
      const url = `${environment.apiPath}auth/login`;
      return this.http.post<{ code: number, token: string, primerAcceso: boolean }>(url, { email, password });
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

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  cambiarPassword(email: string, nuevaPassword: string): Observable<any> {
    const url = `${environment.apiPath}auth/cambiar-password`;
    return this.http.post(url, { email, nuevaPassword });
  }
}
