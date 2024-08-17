import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { Payment } from '../../../entities/payment';
import { PaymentService } from '../../../services/external/payment/index.service';

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.sass']
})
export class PaymentsPageComponent {

  payments$: Observable<Payment[]>
  hasFailed: boolean = false

  constructor(private paymentService: PaymentService) {
    const from = '2024-07-01';
    const to = '2024-07-30';

    this.payments$ = this.paymentService
      .getAll({ from, to })
      .pipe(catchError(() => {
        this.hasFailed = true
        return of([])
      }));
  }

}
