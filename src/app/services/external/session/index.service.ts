import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

import { SignInRequestDTO } from '../../dtos/session/sign-in-request';
import { SignUpRequestDTO } from '../../dtos/session/sign-up-request';
import { Session } from '../../entities/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private httpClient: HttpClient) { }

  signIn(payload: SignInRequestDTO): Observable<Session> {
    return this.httpClient.post<Session>('/api/auth/sign-in', payload)
      .pipe(take(1));
  }

  signUp(payload: SignUpRequestDTO): Observable<{ id: number }> {
    return this.httpClient.post<{ id: number }>('/api/auth/sign-up', payload)
      .pipe(take(1));
  }

  signOut(): Observable<void> {
    return this.httpClient.delete<void>('/api/auth/sign-out')
      .pipe(take(1));
  }
}
