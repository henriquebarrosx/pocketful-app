import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SignInResponseDTO } from '../../external/session/dtos/sign-in-response';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  private SESSION_STORAGE_KEY = '@pocketful/session'
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loggedIn.next(!!this.getSession());
  }

  get isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  updateSession(session: SignInResponseDTO): void {
    localStorage.setItem(this.SESSION_STORAGE_KEY, JSON.stringify(session));
    this.loggedIn.next(true);
  }

  getSession(): SignInResponseDTO | null {
    const session = localStorage.getItem(this.SESSION_STORAGE_KEY);
    if (!session) return null;

    const sessionDTO: SignInResponseDTO = JSON.parse(session);
    return sessionDTO;
  }

  destroySession(): void {
    localStorage.removeItem(this.SESSION_STORAGE_KEY);
    this.loggedIn.next(false);
  }
}
