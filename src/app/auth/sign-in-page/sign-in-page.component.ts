import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SignInResponseDTO } from '../../shared/services/external/auth/dtos/sign-in-response';
import { AuthService } from '../../shared/services/external/auth/index.service';
import { SessionService } from '../../shared/services/internal/session/index.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.sass'],
})
export class SignInPageComponent {
  formControl: FormGroup
  isSubmitting: boolean = false
  isHelperMessageVisible: boolean = false
  isInvalidCredentialsVisible: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService,
  ) {
    this.formControl = this.formBuilder
      .group({
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]]
      })
  }

  onSubmit() {
    if (this.formControl.valid) {
      this.isSubmitting = true
      this.isHelperMessageVisible = false
      this.signIn()
      return
    }

    this.formControl.markAllAsTouched()
  }

  private signIn() {
    const payload = {
      email: this.formControl.value.email,
      password: this.formControl.value.password
    }

    this.authService.signIn(payload)
      .subscribe({
        next: (session) => this.onSuccess(session),
        error: (error) => this.onError(error),
      });
  }

  private onSuccess(session: SignInResponseDTO) {
    this.isSubmitting = false;
    this.sessionService.save(session)
  }

  private onError(error: HttpErrorResponse) {
    if (error.status === HttpStatusCode.Unauthorized) {
      this.isInvalidCredentialsVisible = true
    }

    else if (error.status === HttpStatusCode.InternalServerError) {
      this.isHelperMessageVisible = true
    }

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
