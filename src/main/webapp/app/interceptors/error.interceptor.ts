// src/app/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { getReasonPhrase } from 'http-status-codes';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const status = error.status || 0;
        const message = getReasonPhrase(status) || 'Error';
        this.router.navigate(['/error'], {
          state: {
            errorStatus: status.toString(),
            errorMessage: message
          }
        });
        
        return throwError(() => error);
      })
    );
  }
}
