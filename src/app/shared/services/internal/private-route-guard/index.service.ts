import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { SessionService } from '../session/index.service';

@Injectable({ providedIn: 'root' })
export class PrivateRouteGuard {

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> | Subscription | Promise<boolean> | boolean {
    return this.sessionService.session
      .subscribe({
        next: (session) => {
          if (!!session) return true

          this.router.navigate(['/auth/sign-in']);
          return false
        }
      })
  }

}
