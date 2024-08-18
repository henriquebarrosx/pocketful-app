import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PaymentsRoutingModule } from './payments-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PaymentsRoutingModule,
  ]
})
export class PaymentsModule { }
