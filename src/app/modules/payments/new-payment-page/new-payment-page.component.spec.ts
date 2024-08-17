import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentPageComponent } from './new-payment-page.component';

describe('NewPaymentPageComponent', () => {
  let component: NewPaymentPageComponent;
  let fixture: ComponentFixture<NewPaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPaymentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
