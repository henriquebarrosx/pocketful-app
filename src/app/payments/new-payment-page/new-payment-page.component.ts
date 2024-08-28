import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { PaymentCategory } from '../../shared/models/payment-category';
import { PaymentCategoryService } from '../../shared/services/external/payment-category/index.service';

@Component({
  selector: 'app-new-payment-page',
  templateUrl: './new-payment-page.component.html',
  styleUrls: ['./new-payment-page.component.sass'],
})
export class NewPaymentPageComponent {
  formControl: FormGroup
  categories$: Observable<PaymentCategory[]>

  valor = 'R$ 25,00'
  diaMes = 12
  totaisMeses = '3 meses'
  isCategoriesVisible: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private paymentCategoryService: PaymentCategoryService
  ) {
    this.formControl = this.getFormBuilder();
    this.categories$ = this.getCategories();
  }

  getCategories() {
    return this.paymentCategoryService.getAll()
  }

  onSubmit() {
    this.formControl?.markAsTouched()
  }

  getFormBuilder(): FormGroup {
    return this.formBuilder.group({
      amount: ['0,00', [Validators.required]],
      description: [null, [Validators.required]],
      type: [null, [Validators.required]],
      category: [null, [Validators.required]],
      dayOfMonth: [5, [Validators.required]],
      times: [2, [Validators.required]],
    });
  }

  displayCategories() {
    this.isCategoriesVisible = true;
  }

  hideCategories() {
    this.isCategoriesVisible = false;
  }

  isFieldValidationVisible(formControl: FormGroup<any>, name: string): boolean {
    const control = formControl.get(name)

    if (!control) return false;
    if (!control.invalid) return false
    return control.touched && control.dirty;
  }

  validatePresenceOfErrors(formControl: FormGroup<any>, name: string, validation: string): boolean {
    const control = formControl.get(name)

    if (!control) return false;
    return formControl.get(name)?.errors?.[validation]
  }

}
