import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonComponent } from '../../components/button/button.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

@NgModule({
  declarations: [
    SignInPageComponent,
    SignUpPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonComponent,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
