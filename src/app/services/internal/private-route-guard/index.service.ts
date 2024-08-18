import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';

import { SessionService } from '../session/index.service';

@Injectable({ providedIn: 'root' })
export class PrivateRouteGuard {

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.sessionService.isAuthenticated
      .pipe(
        take(1),
        map(isAuthenticated => {
          if (isAuthenticated) return true;
          this.router.navigate(['/auth/sign-in']);
          return false;
        })
      );
  }

}
