import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SessionResponseDTO } from '../../../dtos/session/sign-in-response-dto';
import { Session } from '../../../entities/session';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private SESSION_STORAGE_KEY = '@pocketful/session'
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loggedIn.next(!!this.getSession());
  }

  get isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  updateSession(session: Session): void {
    localStorage.setItem(this.SESSION_STORAGE_KEY, JSON.stringify(session));
    this.loggedIn.next(true);
  }

  getSession(): Session | null {
    const session = localStorage.getItem(this.SESSION_STORAGE_KEY);
    if (!session) return null;

    const sessionDTO: SessionResponseDTO = JSON.parse(session);
    const { id, name, email, token, role } = sessionDTO;
    return new Session(id, name, email, token, role);
  }

  destroySession(): void {
    localStorage.removeItem(this.SESSION_STORAGE_KEY);
    this.loggedIn.next(false);
  }
}
