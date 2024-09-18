import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentPageComponent } from './edit-payment-page.component';

describe('EditPaymentPageComponent', () => {
  let component: EditPaymentPageComponent;
  let fixture: ComponentFixture<EditPaymentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaymentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
