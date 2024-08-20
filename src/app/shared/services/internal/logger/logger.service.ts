import { Injectable } from '@angular/core';

import { environment } from '../../../../../environments/environment';
import { LocalDateService } from '../local-date/index.service';
import { LocalDateFormat } from '../local-date/types';

@Injectable({ providedIn: 'root' })
export class LoggerService {

  constructor(private localDate: LocalDateService) { }

  info(message: string, ...args: any[]) {
    if (environment.production) return
    const datetime = this.localDate.format(new Date(), LocalDateFormat.DATETIME)
    const msg = `[${datetime}] INFO: ${message}\n`
    console.log(msg, ...args)
  }

  error(message: string, ...args: any[]) {
    if (environment.production) return
    const datetime = this.localDate.format(new Date(), LocalDateFormat.DATETIME)
    const msg = `[${datetime}] ERROR: ${message}\n`
    console.error(msg, ...args)
  }

}
