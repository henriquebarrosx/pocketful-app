import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-payment-page',
  templateUrl: './new-payment-page.component.html',
  styleUrls: ['./new-payment-page.component.sass'],
})
export class NewPaymentPageComponent implements OnInit {

  ngOnInit(): void { }

  formattedFrequencyDay = 12
  formatedFrequencyTimesText = '3 meses'

}
