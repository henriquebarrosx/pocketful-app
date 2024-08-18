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

  payments$: Observable<PaymentResponseDTO[]>
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

  onClick() { }

}
