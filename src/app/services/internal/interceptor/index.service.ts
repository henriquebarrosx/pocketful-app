import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { SessionService } from '../session/index.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private sessionService: SessionService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({
      setHeaders: { Authorization: `${this.getAccessToken()}` }
    });

    return next.handle(request)
      .pipe(
        catchError((error) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            this.sessionService.destroy();
          }

          return throwError(() => new Error(error.message));
        })
      );
  }

  private getAccessToken(): string {
    return this.sessionService.get()
      ? `Bearer ${this.sessionService.get()?.token}`
      : '';
  }

}
