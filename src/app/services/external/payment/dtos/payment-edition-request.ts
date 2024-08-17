import { PaymentSelectionOption } from "../../../../entities/payment-selection-option";

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