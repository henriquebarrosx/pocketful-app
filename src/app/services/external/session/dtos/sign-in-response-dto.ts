import { SessionRole } from "../../../../entities/session-role";

export type SignInResponseParamsDTO = {
  id: number,
  name: string,
  email: string,
  token: string,
  role: SessionRole,
}