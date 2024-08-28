import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

import { PaymentCategory } from '../../../models/payment-category';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentCategoryService {
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<PaymentCategory[]> {
    return this.httpClient.get<PaymentCategory[]>(`${environment.API_BASE_URL}/v1/payments/categories`)
      .pipe(
        take(1)
      )
  }
}
