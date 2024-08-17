import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { SessionStorageService } from '../../session/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private sessionStorageService: SessionStorageService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: { Authorization: `${this.getAccessToken()}` }
    });

    return next.handle(request)
      .pipe(
        catchError((error) => {
          if (error.status === 401) this.sessionStorageService.destroySession();
          return throwError(() => new Error(error.message));
        })
      );
  }

  private getAccessToken(): string {
    if (!this.sessionStorageService.getSession()) return ''
    return `Bearer ${this.sessionStorageService.getSession()?.token}`;
  }

}
