import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { PaymentCreationParamsDTO } from './dtos/payment-creation-request';
import { PaymentDeletionParamsDTO } from './dtos/payment-deletion-request';
import { PaymentEditionParamsDTO } from './dtos/payment-edition-request';
import { PaymentFilterParamsDTO } from './dtos/payment-filter-request';
import { PaymentResponseDTO } from './dtos/payment-response';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private httpClient: HttpClient) { }

  getAll(payload: PaymentFilterParamsDTO): Observable<PaymentResponseDTO[]> {
    const startAt = payload.from ? `startAt=${payload.from}` : '';
    const endAt = payload.to ? `endAt=${payload.to}` : '';
    const params = `${startAt}&${endAt}`;

    return this.httpClient.get<PaymentResponseDTO[]>(`${environment.API_BASE_URL}/v1/payments?${params}`)
      .pipe(take(1));
  }

  get(id: number): Observable<PaymentResponseDTO> {
    return this.httpClient.get<PaymentResponseDTO>(`${environment.API_BASE_URL}/v1/payments/${id}`);
  }

  create(payload: PaymentCreationParamsDTO): Observable<{ id: number }> {
    return this.httpClient.post<{ id: number }>(`${environment.API_BASE_URL}/v1/payments`, payload)
      .pipe(take(1));
  }

  update(id: number, payload: PaymentEditionParamsDTO): Observable<void> {
    return this.httpClient.put<void>(`${environment.API_BASE_URL}/v1/payments/${id}`, payload)
      .pipe(take(1));
  }

  delete(payload: PaymentDeletionParamsDTO): Observable<void> {
    return this.httpClient.delete<void>(`${environment.API_BASE_URL}/v1/payments/${payload.id}`, { body: { type: payload.type } })
      .pipe(take(1));
  }
}
