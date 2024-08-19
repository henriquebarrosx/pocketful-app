import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { SessionService } from '../session/index.service';

@Injectable({ providedIn: 'root' })
export class PublicRouteGuard {

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> | Subscription | Promise<boolean> | boolean {
    return this.sessionService.session
      .subscribe({
        next: (session) => {
          if (!!session) {
            this.router.navigate(['/']);
            return false;
          }

          return true
        },
      })
  }
}
