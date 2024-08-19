import { PaymentSelectionOption } from "./payment-response";

export type PaymentEditionParamsDTO = {
  id: number;
  amount: number;
  description: string;
  payed: boolean;
  isExpense: boolean;
  deadlineAt: string;
  paymentCategoryId: number;
  type: PaymentSelectionOption;
}