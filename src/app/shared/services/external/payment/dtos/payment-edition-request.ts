
export type PaymentEditionParamsDTO = {
  amount: number;
  description: string;
  payed: boolean;
  isExpense: boolean;
  deadlineAt: string;
  paymentCategoryId: number;
  type: number;
}