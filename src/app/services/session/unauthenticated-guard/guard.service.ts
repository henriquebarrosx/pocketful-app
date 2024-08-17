import { Injectable } from '@angular/core';
import { SessionStorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedGuard {

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.sessionStorageService.isAuthenticated
      .pipe(
        take(1),
        map(isAuthenticated => {
          if (!isAuthenticated) return true;
          this.router.navigate(['/']);
          return false;
        })
      );
  }

}
