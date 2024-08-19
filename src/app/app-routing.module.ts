import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateRouteGuard } from './shared/services/services/internal/private-route-guard/index.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'payments'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then((m) => m.AuthModule),
  },
  {
    path: 'payments',
    canActivate: [PrivateRouteGuard],
    loadChildren: () => import('./payments/payments.module')
      .then((m) => m.PaymentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
