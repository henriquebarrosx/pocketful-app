import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyFormaterService } from '../../mask/currency/currency.service';

@Pipe({ name: 'currencyBRL' })
export class CurrencyPipe implements PipeTransform {

  constructor(private currencyFormater: CurrencyFormaterService) { }

  transform(value: string | number, ...args: unknown[]): unknown {
    return this.currencyFormater.format(value);
  }

}
