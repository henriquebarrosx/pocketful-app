import { SessionRole } from "./session-role";

export class Session {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public token: string,
    public role: SessionRole,
  ) { }
}