import { PaymentCategory } from "./payment-category";

export type Payment = {
  id: number;
  amount: number;
  description: string;
  isPayed: boolean;
  isExpense: boolean;
  frequencyTimes: number;
  deadlineAt: string;
  category: PaymentCategory;
}