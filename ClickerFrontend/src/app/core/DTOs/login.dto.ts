// login.dto.ts
export class LoginDto {
  constructor(
    public email: string,  // or email if you use email to login
    public password: string
  ) {}
}
