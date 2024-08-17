import { PaymentSelectionOption } from "./payment-response";

export type PaymentDeletionParamsDTO = {
  id: number;
  type: PaymentSelectionOption;
}