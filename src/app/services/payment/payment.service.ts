import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

import { PaymentCreationRequestDTO } from '../../dtos/payment-creation-request';
import { PaymentDeletionRequestDTO } from '../../dtos/payment-deletion-request';
import { PaymentEditionRequestDTO } from '../../dtos/payment-edition-request';
import { PaymentFilterRequestDTO } from '../../dtos/payment-filter-request';
import { Payment } from '../../entities/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  getAll(payload: PaymentFilterRequestDTO): Observable<Payment[]> {
    const startAt = payload.from ? `startAt=${payload.from}` : '';
    const endAt = payload.to ? `endAt=${payload.to}` : '';
    const params = startAt + endAt;

    return this.httpClient.get<Payment[]>(`/api/payments?${params}`)
      .pipe(take(1));
  }

  create(payload: PaymentCreationRequestDTO): Observable<{ id: number }> {
    return this.httpClient.post<{ id: number }>('/api/payments', payload)
      .pipe(take(1));
  }

  update(payload: PaymentEditionRequestDTO): Observable<void> {
    return this.httpClient.put<void>(`/api/payments/${payload.id}`, payload)
      .pipe(take(1));
  }

  delete(payload: PaymentDeletionRequestDTO): Observable<void> {
    return this.httpClient.delete<void>(`/api/payments/${payload.id}?type=${payload.type}`)
      .pipe(take(1));
  }
}
