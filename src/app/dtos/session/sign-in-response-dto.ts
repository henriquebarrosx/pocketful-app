import { SessionRole } from "../../entities/session-role";

export type SessionResponseDTO = {
  id: number,
  name: string,
  email: string,
  token: string,
  role: SessionRole,
}