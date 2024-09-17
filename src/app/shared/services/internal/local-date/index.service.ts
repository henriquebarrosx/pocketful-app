import { Injectable } from '@angular/core';
import { endOfMonth, format, isAfter, isToday, parseISO, startOfDay, startOfMonth } from 'date-fns';

import { LocalDateFormat, Period } from './types';

@Injectable({ providedIn: 'root' })
export class LocalDateService {

  format(period: Period, formatStr: LocalDateFormat): string {
    return format(period, formatStr);
  }

  isValid(period: Period) {
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

  isToday(period: Period) {
    return isToday(period);
  }

  isAfter(date: Period, dateToCompare: Period) {
    return isAfter(startOfDay(date), startOfDay(dateToCompare))
  }
}

