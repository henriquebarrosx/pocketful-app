import { Observable, take } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PaymentCategory } from '../../shared/models/payment-category';
import { LocalDateFormat } from '../../shared/services/internal/local-date/types';
import { LoggerService } from '../../shared/services/internal/logger/logger.service';
import { PaymentService } from '../../shared/services/external/payment/index.service';
import { LocalDateService } from '../../shared/services/internal/local-date/index.service';
import { PaymentCategoryService } from '../../shared/services/external/payment-category/index.service';
import { CurrencyFormaterService } from '../../shared/services/internal/mask/currency/currency.service';
import { PaymentResponseDTO, PaymentSelectionOption } from '../../shared/services/external/payment/dtos/payment-response';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-edit-payment-page',
  templateUrl: './edit-payment-page.component.html',
  styleUrls: ['./edit-payment-page.component.sass']
})
export class EditPaymentPageComponent {
  formGroup = this.obterFormularioInicial();
  categorias$: Observable<PaymentCategory[]>;
  pagamento: PaymentResponseDTO | null = null;

  opcaoConfirmacaoExclusao = PaymentSelectionOption.THIS_PAYMENT
  isConfirmacaoExclusaoVisivel = false;
  isCategoriesVisible: boolean = false;
  isSubmitting: boolean = false;
  isCarregando: boolean = true;
  isPagamentoInexistente: boolean = false;

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
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly localDate: LocalDateService,
    private readonly loggerService: LoggerService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly paymentService: PaymentService,
    private readonly paymentCategoryService: PaymentCategoryService,
    private readonly currencyFormaterService: CurrencyFormaterService,
  ) {
    this.buscarPagamento();
    this.categorias$ = this.paymentCategoryService.getAll();
    this.aplicarFormatacaoMoeda('valor');
  }

  buscarPagamento() {
    const idPagamento = this.activatedRoute.snapshot.params['id'];
    this.isCarregando = true;

    this.paymentService.get(idPagamento)
      .pipe(take(1))
      .subscribe({
        next: (pagamento) => {
          this.isCarregando = false;
          this.pagamento = pagamento;
          this.atualizarFormulario(pagamento);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.NotFound) {
            this.isPagamentoInexistente = true;
          }

          this.isCarregando = false;
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

    this.paymentService
      .update(this.pagamento.id, parametros)
      .subscribe({
        next: () => {
          this.loggerService.info(`pagamento ${this.pagamento?.id} atualizado com sucesso.`)
          this.isSubmitting = false;
          this.router.navigate(['/payments']);
        },
        error: () => {
          this.loggerService.error(`Erro ao processar atualização do pagamento ${this.pagamento?.id}!`);
          this.isSubmitting = false;
          this.formGroup.markAllAsTouched();
        },
      });
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

    const parametros = {
      id: this.pagamento.id,
      type: parseInt(this.opcaoConfirmacaoExclusao.toString()),
    }

    this.paymentService.delete(parametros)
      .subscribe({
        next: () => {
          this.loggerService.info(`pagamento ${parametros.id} excluído com sucesso.`);
          this.router.navigate(['/'])
        },
        error: () => {
          this.loggerService.error(`Erro ao processar exclusão do pagamento ${parametros.id}!`);
        }
      });
  }

  cancelarExclusao() {
    this.isConfirmacaoExclusaoVisivel = false;
  }

  voltar() {
    this.router.navigate(['/'])
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
