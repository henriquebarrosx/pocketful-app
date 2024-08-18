import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { SignInResponseDTO } from '../../external/auth/dtos/sign-in-response';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private SESSION_STORAGE_KEY = '@pocketful/session'
  private cachedSession$ = new BehaviorSubject<SignInResponseDTO | null>(null);

  constructor() {
    const cachedSession = this.get();
    this.cachedSession$.next(cachedSession);
  }

  get session(): Observable<SignInResponseDTO | null> {
    return this.cachedSession$.asObservable()
  }

  get bearerToken(): string {
    return this.get() ? `Bearer ${this.get()?.token}` : '';
  }

  get(): SignInResponseDTO | null {
    const stringfiedSession = localStorage.getItem(this.SESSION_STORAGE_KEY);
    if (!stringfiedSession) return null;

    const session: SignInResponseDTO = JSON.parse(stringfiedSession);
    return session;
  }

  save(session: SignInResponseDTO): void {
    localStorage.setItem(this.SESSION_STORAGE_KEY, JSON.stringify(session));
    this.cachedSession$.next(session);
  }

  destroy(): void {
    localStorage.removeItem(this.SESSION_STORAGE_KEY);
    this.cachedSession$.next(null);
  }
}
