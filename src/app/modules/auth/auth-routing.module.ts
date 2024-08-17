import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthenticatedGuard } from '../../services/internal/unauthenticated-guard/index.service';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInPageComponent,
    canActivate: [UnauthenticatedGuard],
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
