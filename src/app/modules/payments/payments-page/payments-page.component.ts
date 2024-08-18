import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { ButtonComponent } from '../../../components/button/button.component';
import { PaymentResponseDTO } from '../../../services/external/payment/dtos/payment-response';
import { PaymentService } from '../../../services/external/payment/index.service';

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.sass'],
  standalone: true,
  imports: [CommonModule, ButtonComponent]
})
export class PaymentsPageComponent {

  payments$?: Observable<PaymentResponseDTO[]>

  hasFailed: boolean = false
  startAt: string = '2024-07-01'
  endAt: string = '2024-07-30'

  constructor(private paymentService: PaymentService) {
    this.getPayments();
  }

  getPayments() {
    this.payments$ = this.paymentService
      .getAll({ from: this.startAt, to: this.endAt })
      .pipe(
        catchError(() => {
          this.hasFailed = true
          return of([])
        })
      );
  }

}
