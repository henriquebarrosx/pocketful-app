import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaymentsPageComponent } from './payments-page/payments-page.component';
import { PaymentsRoutingModule } from './payments-routing.module';


@NgModule({
  declarations: [
    PaymentsPageComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
