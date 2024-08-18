import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '../../components/button/button.component';
import { PaymentsPageComponent } from './payments-page/payments-page.component';
import { PaymentsRoutingModule } from './payments-routing.module';

@NgModule({
  declarations: [
    PaymentsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    PaymentsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PaymentsModule { }
