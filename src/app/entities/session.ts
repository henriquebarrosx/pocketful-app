import { SessionRole } from "./session-role";

export class Session {
  constructor(
    private id: number,
    private name: string,
    private email: string,
    private token: string,
    private role: SessionRole,
  ) { }
}