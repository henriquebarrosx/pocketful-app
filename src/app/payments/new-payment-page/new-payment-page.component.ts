import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PaymentCategory } from '../../shared/models/payment-category';
import { LocalDateFormat } from '../../shared/services/internal/local-date/types';
import { LoggerService } from '../../shared/services/internal/logger/logger.service';
import { PaymentService } from '../../shared/services/external/payment/index.service';
import { LocalDateService } from '../../shared/services/internal/local-date/index.service';
import { PaymentCategoryService } from '../../shared/services/external/payment-category/index.service';
import { CurrencyFormaterService } from '../../shared/services/internal/mask/currency/currency.service';

@Component({
  selector: 'app-new-payment-page',
  templateUrl: './new-payment-page.component.html',
  styleUrls: ['./new-payment-page.component.sass'],
})
export class NewPaymentPageComponent {
  categories$: Observable<PaymentCategory[]>;

  formGroup = this.obterFormularioInicial();
  isCategoriesVisible: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly localDate: LocalDateService,
    private readonly loggerService: LoggerService,
    private readonly paymentService: PaymentService,
    private readonly paymentCategoryService: PaymentCategoryService,
    private readonly currencyFormaterService: CurrencyFormaterService,
  ) {
    this.categories$ = this.paymentCategoryService.getAll();
    this.aplicarFormatacaoMoeda('amount');
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
      payed: this.formGroup.value.payed,
      isExpense: this.formGroup.value.type === 'Despesa',
      deadlineAt: this.formGroup.value.dayOfMonth,
      frequencyTimes: parseInt(this.formGroup.value.times),
      isIndeterminate: this.formGroup.value.times === 0,
      paymentCategoryId: parseInt(this.formGroup.value.category),
    }

    this.paymentService.create(payload)
      .subscribe({
        next: ({ id }) => {
          this.loggerService.info(`pagamento ${id} cadastrado com sucesso.`)
          this.router.navigate([`/payments/${id}`]);
        },
        error: () => {
          this.loggerService.error('Erro ao processar cadastro do pagamento!');
          this.isSubmitting = false;
          this.formGroup.markAllAsTouched();
        },
      });
  }

  obterFormularioInicial(): FormGroup {
    return this.formBuilder.group({
      amount: ['0,00', [Validators.required]],
      description: [null, [Validators.required]],
      type: [null, [Validators.required]],
      category: [null, [Validators.required]],
      dayOfMonth: [this.localDate.format(new Date(), LocalDateFormat.ISO_DATE), [Validators.required]],
      times: [1, [Validators.required]],
      payed: [false],
    });
  }

  aplicarFormatacaoMoeda(fieldName: string) {
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
