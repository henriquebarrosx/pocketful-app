import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicRouteGuard } from '../shared/services/internal/public-route-guard/index.service';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInPageComponent,
    canActivate: [PublicRouteGuard],
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
