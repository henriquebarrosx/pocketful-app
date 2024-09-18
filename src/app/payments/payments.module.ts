import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewPaymentPageComponent } from './new-payment-page/new-payment-page.component';
import { PaymentsPageComponent } from './payments-page/payments-page.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { CurrencyPipe } from '../shared/services/internal/pipes/currency/currency.pipe';
import { EditPaymentPageComponent } from './edit-payment-page/edit-payment-page.component';

@NgModule({
  declarations: [
    NewPaymentPageComponent,
    PaymentsPageComponent,
    CurrencyPipe,
    EditPaymentPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaymentsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PaymentsModule { }
