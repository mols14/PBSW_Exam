// login.dto.ts
export class LoginDto {
  constructor(
    public username: string,  // or email if you use email to login
    public password: string
  ) {}
}
