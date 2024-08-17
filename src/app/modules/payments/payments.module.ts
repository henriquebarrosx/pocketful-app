import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NewPaymentPageComponent } from './new-payment-page/new-payment-page.component';
import { PaymentsPageComponent } from './payments-page/payments-page.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { ButtonComponent } from '../../components/button/button.component';

@NgModule({
  declarations: [
    ButtonComponent,
    NewPaymentPageComponent,
    PaymentsPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
