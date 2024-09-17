import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { PaymentCategory } from '../../shared/models/payment-category';
import { PaymentCategoryService } from '../../shared/services/external/payment-category/index.service';
import { PaymentService } from '../../shared/services/external/payment/index.service';
import { LoggerService } from '../../shared/services/internal/logger/logger.service';
import { CurrencyFormaterService } from '../../shared/services/internal/mask/currency/currency.service';

@Component({
  selector: 'app-new-payment-page',
  templateUrl: './new-payment-page.component.html',
  styleUrls: ['./new-payment-page.component.sass'],
})
export class NewPaymentPageComponent {
  formGroup: FormGroup;
  categories$: Observable<PaymentCategory[]>;

  valor = 'R$ 25,00'
  diaMes = 12
  totaisMeses = '3 meses'

  isCategoriesVisible: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loggerService: LoggerService,
    private paymentService: PaymentService,
    private paymentCategoryService: PaymentCategoryService,
    private currencyFormaterService: CurrencyFormaterService,
  ) {
    this.formGroup = this.getFormBuilder();
    this.categories$ = this.paymentCategoryService.getAll();
    this.applyCurrencyFormater('amount');
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.isSubmitting = true
      this.createPayment();
      return
    }

    this.formGroup.markAllAsTouched();
  }

  createPayment() {
    const payload = {
      amount: this.currencyFormaterService.unformat(this.formGroup.value.amount),
      description: this.formGroup.value.description,
      payed: false,
      isExpense: this.formGroup.value.type === 'Despesa',
      deadlineAt: this.formGroup.value.dayOfMonth,
      frequencyTimes: parseInt(this.formGroup.value.times),
      isIndeterminate: this.formGroup.value.times === 0,
      paymentCategoryId: parseInt(this.formGroup.value.category),
    }

    this.paymentService.create(payload)
      .subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError(),
      });
  }

  private onSuccess() {
    this.loggerService.info('pagamento cadastrado com sucesso. Redirecionando para o pagamentos.')
    this.isSubmitting = false;
    this.router.navigate(['/payments']);
  }

  private onError() {
    this.loggerService.error('Erro ao processar cadastro de pagamento!');
    this.isSubmitting = false;
    this.formGroup.markAllAsTouched();
  }

  getFormBuilder(): FormGroup {
    return this.formBuilder.group({
      amount: ['0,00', [Validators.required]],
      description: [null, [Validators.required]],
      type: [null, [Validators.required]],
      category: [null, [Validators.required]],
      dayOfMonth: [null, [Validators.required]],
      times: [2, [Validators.required]],
    });
  }

  displayCategories() {
    this.isCategoriesVisible = true;
  }

  hideCategories() {
    this.isCategoriesVisible = false;
  }

  applyCurrencyFormater(fieldName: string) {
    const field = this.formGroup.get(fieldName);
    if (!field) throw new Error(`field not found: ${fieldName}`)

    field.valueChanges.subscribe((value) => {
      this.formGroup.patchValue({
        [fieldName]: this.currencyFormaterService.format(value),
      }, { emitEvent: false });
    })
  }

  isFieldHintDisplayed(formControl: FormGroup<any>, name: string): boolean {
    const control = formControl.get(name)
    if (!control) return false;

    return !!control.errors && control.touched
  }

  isFieldValidationVisible(formControl: FormGroup<any>, name: string): boolean {
    const control = formControl.get(name)

    if (!control) return false;
    if (!control.invalid) return false;
    return control.touched || control.dirty;
  }

  validatePresenceOfErrors(formControl: FormGroup<any>, name: string, validation: string): boolean {
    const control = formControl.get(name)

    if (!control) return false;
    return formControl.get(name)?.errors?.[validation]
  }

}
