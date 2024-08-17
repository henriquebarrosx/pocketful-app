export type PaymentCreationParamsDTO = {
  amount: number;
  description: string;
  payed: boolean;
  isExpense: boolean;
  deadlineAt: string;
  frequencyTimes: number;
  isIndeterminate: boolean;
  paymentCategoryId: number;
}