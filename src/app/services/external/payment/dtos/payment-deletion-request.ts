import { PaymentSelectionOption } from "../../../../entities/payment-selection-option";

export type PaymentDeletionParamsDTO = {
  id: number;
  type: PaymentSelectionOption;
}