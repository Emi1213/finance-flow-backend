import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  password: string;
}