import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CurrencyFormaterService {

  format(value: string | number): string {
    if (typeof value === 'number') return this.formatFromFloat(value);
    return this.formatFromString(value);
  }

  unformat(value: string): number {
    const withoutBigDecimal = value.replace(/\./g, '');
    const withoutComma = withoutBigDecimal.replace(',', '.');
    return parseFloat(withoutComma);
  }

  private formatFromString(value: string): string {
    const valueAsNumber = value.replace(/[^\d]/g, '');
    const valueAsBigDecimal = parseFloat(parseFloat(valueAsNumber).toFixed(2)) / 100;

    if (!valueAsBigDecimal) return '';
    if (isNaN(valueAsBigDecimal)) return '0,00';

    const currencyBRL = valueAsBigDecimal
      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return this.sanatize(currencyBRL);
  }

  private formatFromFloat(value: number): string {
    const valueAsBigDecimal = parseFloat(value.toFixed(2));
    if (isNaN(valueAsBigDecimal)) return '0,00';

    const currencyBRL = valueAsBigDecimal
      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return this.sanatize(currencyBRL);
  }

  private sanatize(currency: string) {
    return currency
      .replace(/\s/g, '')
      .replace('R$', '')
  }

}
