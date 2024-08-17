import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

import { environment } from '../../../environments/environment';
import { PaymentCreationRequestDTO } from '../../dtos/payment/payment-creation-request';
import { PaymentDeletionRequestDTO } from '../../dtos/payment/payment-deletion-request';
import { PaymentEditionRequestDTO } from '../../dtos/payment/payment-edition-request';
import { PaymentFilterRequestDTO } from '../../dtos/payment/payment-filter-request';
import { Payment } from '../../entities/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private BASE_URL = environment.api_url;

  constructor(private httpClient: HttpClient) { }

  getAll(payload: PaymentFilterRequestDTO): Observable<Payment[]> {
    const startAt = payload.from ? `startAt=${payload.from}` : '';
    const endAt = payload.to ? `endAt=${payload.to}` : '';
    const params = `${startAt}&${endAt}`;

    return this.httpClient.get<Payment[]>(`${this.BASE_URL}/v1/payments?${params}`)
      .pipe(take(1));
  }

  create(payload: PaymentCreationRequestDTO): Observable<{ id: number }> {
    return this.httpClient.post<{ id: number }>(`${this.BASE_URL}/v1/payments`, payload)
      .pipe(take(1));
  }

  update(payload: PaymentEditionRequestDTO): Observable<void> {
    return this.httpClient.put<void>(`${this.BASE_URL}/v1/payments/${payload.id}`, payload)
      .pipe(take(1));
  }

  delete(payload: PaymentDeletionRequestDTO): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/v1/payments/${payload.id}?type=${payload.type}`)
      .pipe(take(1));
  }
}
