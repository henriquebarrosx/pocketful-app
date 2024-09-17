import { Injectable } from '@angular/core';
import { endOfMonth, format, parseISO, startOfMonth } from 'date-fns';

import { LocalDateFormat } from './types';

@Injectable({ providedIn: 'root' })
export class LocalDateService {

  format(period: string | number | Date, formatStr: LocalDateFormat): string {
    return format(period, formatStr);
  }

  isValid(period: string | number | Date) {
    return Number.isInteger(new Date(period).getTime());
  }

  getStartOfMonth(period: string): Date {
    const date = parseISO(period);
    return startOfMonth(date);
  }

  getEndOfMonth(period: string): Date {
    const date = parseISO(period);
    return endOfMonth(date);
  }
}

