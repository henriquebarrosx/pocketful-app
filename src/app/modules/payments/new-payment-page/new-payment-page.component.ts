import { Component } from '@angular/core';

import { PaymentService } from '../../../services/external/payment/index.service';

@Component({
  selector: 'app-new-payment-page',
  templateUrl: './new-payment-page.component.html',
  styleUrls: ['./new-payment-page.component.sass'],
})
export class NewPaymentPageComponent {
  payments$

  constructor(private paymentService: PaymentService) {
    const from = '2024-07-01';
    const to = '2024-07-30';

    this.payments$ = this.paymentService
      .getAll({ from, to });
  }

  formattedFrequencyDay = 12
  formatedFrequencyTimesText = '3 meses'

}
