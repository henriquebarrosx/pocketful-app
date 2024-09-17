export type PaymentResponseDTO = {
  id: number;
  amount: number;
  description: string;
  payed: boolean;
  expense: boolean;
  frequencyTimes: number;
  deadlineAt: string;
  paymentCategory: PaymentCategory;
}

export type PaymentCategory = {
  id: number;
  name: string;
}

export enum PaymentSelectionOption {
  THIS_PAYMENT,
  THIS_AND_FUTURE_PAYMENTS,
  ALL_PAYMENTS
}