import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';

import { SessionStorageService } from '../session-storage/index.service';

@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard {

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.sessionStorageService.isAuthenticated
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
