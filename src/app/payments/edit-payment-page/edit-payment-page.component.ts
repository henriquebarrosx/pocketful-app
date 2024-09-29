import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';

import { PaymentCategory } from '../../shared/models/payment-category';
import { PaymentCategoryService } from '../../shared/services/external/payment-category/index.service';
import { PaymentService } from '../../shared/services/external/payment/index.service';
import { LocalDateService } from '../../shared/services/internal/local-date/index.service';
import { LocalDateFormat } from '../../shared/services/internal/local-date/types';
import { LoggerService } from '../../shared/services/internal/logger/logger.service';
import { CurrencyFormaterService } from '../../shared/services/internal/mask/currency/currency.service';
import { PaymentResponseDTO, PaymentSelectionOption } from '../../shared/services/external/payment/dtos/payment-response';

@Component({
  selector: 'app-edit-payment-page',
  templateUrl: './edit-payment-page.component.html',
  styleUrls: ['./edit-payment-page.component.sass']
})
export class EditPaymentPageComponent {
  formGroup: FormGroup;
  categorias$: Observable<PaymentCategory[]>;

  pagamento: PaymentResponseDTO | null = null;

  opcaoConfirmacaoExclusao = PaymentSelectionOption.THIS_PAYMENT
  isConfirmacaoExclusaoVisivel = false;
  isCategoriesVisible: boolean = false;
  isSubmitting: boolean = false;

  opcoesRecorrencia = [
    {
      label: 'Este pagamento',
      value: PaymentSelectionOption.THIS_PAYMENT,
      selected: true,
    },
    {
      label: 'Este e os pagamentos seguintes',
      value: PaymentSelectionOption.THIS_AND_FUTURE_PAYMENTS,
      selected: false,
    },
    {
      label: 'Todos os pagamentos',
      value: PaymentSelectionOption.ALL_PAYMENTS,
      selected: false,
    },
  ]

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private localDate: LocalDateService,
    private loggerService: LoggerService,
    private paymentService: PaymentService,
    private paymentCategoryService: PaymentCategoryService,
    private currencyFormaterService: CurrencyFormaterService,
  ) {
    const idPagamento = this.activatedRoute.snapshot.params['id'];
    this.buscarPagamento(idPagamento);

    this.formGroup = this.obterFormularioInicial();
    this.categorias$ = this.paymentCategoryService.getAll();

    this.aplicarFormatacaoMoeda('valor');
  }

  buscarPagamento(id: number) {
    this.paymentService.get(id)
      .pipe(take(1))
      .subscribe({
        next: (pagamento) => {
          this.pagamento = pagamento;
          this.atualizarFormulario(pagamento);
        }
      })
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.isSubmitting = true
      this.editarPagamento();
      return
    }

    this.formGroup.markAllAsTouched();
  }

  editarPagamento() {
    if (!this.pagamento) throw new Error('pagamento não encontrado');

    const parametros = {
      amount: this.currencyFormaterService.unformat(this.formGroup.value.valor),
      description: this.formGroup.value.descricao,
      payed: this.formGroup.value.pago,
      isExpense: this.formGroup.value.despesa === '0',
      deadlineAt: this.formGroup.value.data,
      paymentCategoryId: parseInt(this.formGroup.value.categoria),
      type: parseInt(this.formGroup.value.recorrencia),
    }

    this.paymentService.update(this.pagamento.id, parametros)
      .subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError(),
      });
  }

  private onSuccess() {
    this.loggerService.info('pagamento atualizado com sucesso. Redirecionando para o pagamentos.')
    this.isSubmitting = false;
    this.router.navigate(['/payments']);
  }

  private onError() {
    this.loggerService.error('Erro ao processar atualização de pagamento!');
    this.isSubmitting = false;
    this.formGroup.markAllAsTouched();
  }

  obterFormularioInicial(): FormGroup {
    return this.formBuilder.group({
      valor: ['0,00', [Validators.required]],
      descricao: [null, [Validators.required]],
      despesa: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      data: [this.localDate.format(new Date(), LocalDateFormat.ISO_DATE), [Validators.required]],
      recorrencia: [0, [Validators.required]],
      pago: [false],
    });
  }

  atualizarFormulario(pagamento: PaymentResponseDTO) {
    return this.formGroup.patchValue({
      valor: this.currencyFormaterService.format(pagamento.amount),
      descricao: pagamento.description,
      despesa: pagamento.expense ? '0' : '1',
      categoria: pagamento.paymentCategory.id,
      data: this.localDate.format(this.localDate.parseISO(pagamento.deadlineAt), LocalDateFormat.ISO_DATE),
      recorrencia: 0,
      pago: pagamento.payed,
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

  exibirConfirmacaoExclusao() {
    this.isConfirmacaoExclusaoVisivel = true;
  }

  excluirPagamento() {
    if (!this.pagamento) throw new Error('pagamento não encontrado');

    this.paymentService
      .delete({
        id: this.pagamento?.id,
        type: parseInt(this.opcaoConfirmacaoExclusao.toString()),
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/'])
        }
      });
  }

  cancelarExclusao() {
    this.isConfirmacaoExclusaoVisivel = false;
  }

  aplicarFormatadorMoeda(fieldName: string) {
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
