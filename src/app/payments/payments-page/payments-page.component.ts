import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, of, tap } from 'rxjs';

import { PaymentResponseDTO } from '../../shared/services/external/payment/dtos/payment-response';
import { PaymentService } from '../../shared/services/external/payment/index.service';
import { LocalDateService } from '../../shared/services/internal/local-date/index.service';
import { LocalDateFormat } from '../../shared/services/internal/local-date/types';
import { FormParams } from './types/form';

enum IdentificadorCategoria {
  CASA = 1,
  EDUCACAO,
  ELETRONICOS,
  LAZER,
  RESTAURANTE,
  SAUDE,
  SERVICOS,
  SUPERMERCADO,
  TRANSPORTE,
  VESTUARIO,
  VIAGEM,
  TRABALHO,
}

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.sass'],
})
export class PaymentsPageComponent {

  payments$?: Observable<PaymentResponseDTO[]>

  formControl: FormGroup
  hasFailed: boolean = false

  constructor(
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private localDate: LocalDateService,
  ) {
    this.formControl = this.getInitializedFormGroup()
    this.getPayments();
  }

  getPayments() {
    const { startAt, endAt } = this.formControl.value;

    this.inserirFiltrosNaURL(startAt, endAt);

    this.payments$ = this.paymentService
      .getAll({ from: startAt, to: endAt })
      .pipe(
        tap(() => this.hasFailed = false),
        catchError(() => {
          this.hasFailed = true
          return of([])
        })
      );
  }

  inserirFiltrosNaURL(startAt: string, endAt: string) {
    const url = new URL(window.location.href);

    url.searchParams.set('startAt', startAt);
    url.searchParams.set('endAt', endAt);

    window.history.pushState(null, '', url);
  }

  obterFiltroNaURL(chave: string, valorPadrao: string) {
    const url = new URL(window.location.href);
    const data = url.searchParams.get(chave);

    if (!data) return valorPadrao;

    return this.localDate.isValid(data) ? data : valorPadrao;
  }

  getPaymentURL(id: number): string {
    return `/payments/${id}`
  }

  isExpired(payment: PaymentResponseDTO) {
    if (payment.payed) return false;
    return this.localDate.isAfter(new Date(), payment.deadlineAt);
  }

  getIconByCategory(categoryId: number): string {
    const iconByCategory: Record<number, string> = {
      [IdentificadorCategoria.CASA]: 'house',
      [IdentificadorCategoria.EDUCACAO]: 'edit',
      [IdentificadorCategoria.ELETRONICOS]: 'stadia_controller',
      [IdentificadorCategoria.LAZER]: 'sports_tennis',
      [IdentificadorCategoria.RESTAURANTE]: 'ramen_dining',
      [IdentificadorCategoria.SAUDE]: 'heart_plus',
      [IdentificadorCategoria.SERVICOS]: 'build',
      [IdentificadorCategoria.SUPERMERCADO]: 'shopping_cart',
      [IdentificadorCategoria.TRANSPORTE]: 'local_taxi',
      [IdentificadorCategoria.VESTUARIO]: 'shopping_bag',
      [IdentificadorCategoria.VIAGEM]: 'flight',
      [IdentificadorCategoria.TRABALHO]: 'work',
    }

    if (!iconByCategory[categoryId]) {
      throw new Error('categoria não possui mapeamento de ícone');
    }

    return iconByCategory[categoryId];
  }

  private getInitializedFormGroup(): FormGroup {
    return this.formBuilder
      .group<FormParams>({
        startAt: [this.obterFiltroNaURL('startAt', this.getStartofMonth())],
        endAt: [this.obterFiltroNaURL('endAt', this.getEndOfMonth())],
      })
  }

  private getStartofMonth(): string {
    const now = new Date().toISOString()
    const startOfMonthDate = this.localDate.getStartOfMonth(now)
    return this.localDate.format(startOfMonthDate, LocalDateFormat.ISO_DATE)
  }

  private getEndOfMonth() {
    const now = new Date().toISOString()
    const startOfMonthDate = this.localDate.getEndOfMonth(now)
    return this.localDate.format(startOfMonthDate, LocalDateFormat.ISO_DATE)
  }

}
