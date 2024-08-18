import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SignInResponseDTO } from '../../external/auth/dtos/sign-in-response';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private SESSION_STORAGE_KEY = '@pocketful/session'
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    const hasStoredSession = !!this.get();
    this.loggedIn.next(hasStoredSession);
  }

  get isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get(): SignInResponseDTO | null {
    const stringfiedSession = localStorage.getItem(this.SESSION_STORAGE_KEY);
    if (!stringfiedSession) return null;

    const session: SignInResponseDTO = JSON.parse(stringfiedSession);
    return session;
  }

  save(session: SignInResponseDTO): void {
    localStorage.setItem(this.SESSION_STORAGE_KEY, JSON.stringify(session));
    this.loggedIn.next(true);
  }

  destroy(): void {
    localStorage.removeItem(this.SESSION_STORAGE_KEY);
    this.loggedIn.next(false);
  }
}
