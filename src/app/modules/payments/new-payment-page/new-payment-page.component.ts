import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-new-payment-page',
  templateUrl: './new-payment-page.component.html',
  styleUrls: ['./new-payment-page.component.sass'],
  standalone: true,
  imports: [CommonModule, ButtonComponent]
})
export class NewPaymentPageComponent {

  formattedFrequencyDay = 12
  formatedFrequencyTimesText = '3 meses'

}
