import { PaymentCategory } from "./payment-category";

export class Payment {
  constructor(
    private id: number,
    private amount: number,
    private description: string,
    private isPayed: boolean,
    private isExpense: boolean,
    private frequencyTimes: number,
    private deadlineAt: string,
    private category: PaymentCategory
  ) { }
}