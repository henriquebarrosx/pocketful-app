import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewPaymentPageComponent } from './new-payment-page/new-payment-page.component';
import { PaymentsPageComponent } from './payments-page/payments-page.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentsPageComponent,
  },
  {
    path: 'new',
    component: NewPaymentPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
