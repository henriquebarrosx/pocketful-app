import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrivateRouteGuard } from './services/internal/private-route-guard/index.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'payments'
  },
  {
    path: 'payments',
    loadChildren: () => import('./modules/payments/payments.module').then((m) => m.PaymentsModule),
    canActivate: [PrivateRouteGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
