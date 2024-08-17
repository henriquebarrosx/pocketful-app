import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { SignInRequestParamsDTO } from './dtos/sign-in-request';
import { SignInResponseParamsDTO } from './dtos/sign-in-response-dto';
import { SignUpRequestParamsDTO } from './dtos/sign-up-request';

@Injectable({ providedIn: 'root' })
export class SessionService {

  constructor(private httpClient: HttpClient) { }

  signIn(payload: SignInRequestParamsDTO): Observable<SignInResponseParamsDTO> {
    return this.httpClient.post<SignInResponseParamsDTO>(`${environment.API_BASE_URL}/api/auth/sign-in`, payload)
      .pipe(take(1));
  }

  signUp(payload: SignUpRequestParamsDTO): Observable<{ id: number }> {
    return this.httpClient.post<{ id: number }>(`${environment.API_BASE_URL}/api/auth/sign-up`, payload)
      .pipe(take(1));
  }

  signOut(): Observable<void> {
    return this.httpClient.delete<void>(`${environment.API_BASE_URL}/api/auth/sign-out`)
      .pipe(take(1));
  }
}
