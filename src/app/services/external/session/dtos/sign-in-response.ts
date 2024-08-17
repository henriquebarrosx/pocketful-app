export type SignInResponseDTO = {
  id: number,
  name: string,
  email: string,
  token: string,
  role: SessionRole,
}

export enum SessionRole {
  ADMIN,
  DEFAULT
}