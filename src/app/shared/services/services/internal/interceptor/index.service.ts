import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { routes } from '../../../../../modules/auth/auth-routing.module';
import { SessionService } from '../session/index.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private sessionService: SessionService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isPublicRoute(req)) {
      return next.handle(req);
    }

    const request = req.clone({
      setHeaders: { Authorization: `${this.sessionService.bearerToken}` }
    });

    return next.handle(request)
      .pipe(
        catchError((error) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            this.sessionService.destroy();
          }

          return throwError(() => error);
        })
      );
  }

  private isPublicRoute(req: HttpRequest<any>): boolean {
    return routes.some(({ path = '' }) =>
      req.url.endsWith(path)
    )
  }

}
