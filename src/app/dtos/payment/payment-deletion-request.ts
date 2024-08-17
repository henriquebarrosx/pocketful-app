import { PaymentSelectionOption } from "../../entities/payment-selection-option";

export type PaymentDeletionRequestDTO = {
  id: number;
  type: PaymentSelectionOption;
}