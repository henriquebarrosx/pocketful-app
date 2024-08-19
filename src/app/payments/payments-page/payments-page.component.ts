import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, of } from 'rxjs';

import { PaymentResponseDTO } from '../../shared/services/external/payment/dtos/payment-response';
import { PaymentService } from '../../shared/services/external/payment/index.service';
import { LocalDateService } from '../../shared/services/services/internal/local-date/index.service';
import { LocalDateFormat } from '../../shared/services/services/internal/local-date/types';
import { FormParams } from './types/form';

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.sass'],
})
export class PaymentsPageComponent {

  payments$?: Observable<PaymentResponseDTO[]>

  formControl: FormGroup
  hasFailed: boolean = false

  constructor(
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private localDate: LocalDateService,
  ) {
    this.formControl = this.getInitializedFormGroup()
    this.getPayments();
  }

  getPayments() {
    const { startAt, endAt } = this.formControl.value

    this.payments$ = this.paymentService
      .getAll({ from: startAt, to: endAt })
      .pipe(
        catchError(() => {
          this.hasFailed = true
          return of([])
        })
      );
  }

  private getInitializedFormGroup(): FormGroup {
    return this.formBuilder
      .group<FormParams>({
        startAt: [this.getStartofMonth()],
        endAt: [this.getEndOfMonth()],
      })
  }

  private getStartofMonth(): string {
    const now = new Date().toISOString()
    const startOfMonthDate = this.localDate.getStartOfMonth(now)
    return this.localDate.format(startOfMonthDate, LocalDateFormat.YYYY_MM_DD)
  }

  private getEndOfMonth() {
    const now = new Date().toISOString()
    const startOfMonthDate = this.localDate.getEndOfMonth(now)
    return this.localDate.format(startOfMonthDate, LocalDateFormat.YYYY_MM_DD)
  }

}
