import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/external/auth/index.service';
import { LoggerService } from '../../shared/services/internal/logger/logger.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.sass']
})
export class SignUpPageComponent {
  formControl: FormGroup
  isSubmitting: boolean = false
  isHelperMessageVisible: boolean = false
  isInvalidCredentialsVisible: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loggerService: LoggerService,
    private router: Router
  ) {
    this.formControl = this.formBuilder
      .group({
        name: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]]
      })
  }

  onSubmit() {
    if (this.formControl.valid) {
      this.isSubmitting = true
      this.isHelperMessageVisible = false
      this.signUp()
      return
    }

    this.formControl.markAllAsTouched()
  }

  private signUp() {

    const payload = {
      name: this.formControl.value.name,
      email: this.formControl.value.email,
      password: this.formControl.value.password
    }

    this.loggerService.info('enviando solicitação de cadastro', payload)

    this.authService.signUp(payload)
      .subscribe({
        next: () => this.onSuccess(),
        error: (error) => this.onError(error),
      });
  }

  private onSuccess() {
    this.loggerService.info('usuário cadastrado com sucesso. Redirecionando para tela de login.')
    this.isSubmitting = false;
    this.router.navigate(['/auth/sign-in'])
  }

  private onError(error: HttpErrorResponse) {
    this.loggerService.error('Erro ao processar cadastro. Erro inesperado!', { error })
    this.isHelperMessageVisible = true

    this.isSubmitting = false;
    this.formControl.markAllAsTouched()
  }

  isFieldValidationVisible(formControl: FormGroup<any>, name: string): boolean {
    const control = formControl.get(name)

    if (!control) return false;
    if (!control.invalid) return false
    return control.touched;
  }

  validatePresenceOfErrors(formControl: FormGroup<any>, name: string, validation: string): boolean {
    const control = formControl.get(name)

    if (!control) return false;
    return formControl.get(name)?.errors?.[validation]
  }
}
