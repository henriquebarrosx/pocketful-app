import { PaymentCategory } from "./payment-category";

export class Payment {
  constructor(
    public id: number,
    public amount: number,
    public description: string,
    public isPayed: boolean,
    public isExpense: boolean,
    public frequencyTimes: number,
    public deadlineAt: string,
    public category: PaymentCategory
  ) { }
}