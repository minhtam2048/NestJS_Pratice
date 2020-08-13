import { IsString, MinLength, MaxLength, IsEmail } from "class-validator";

export class AuthCredentialsDTO {
  @IsString()
  @MinLength(6, {
    message: 'Username is too short (less than 6 characters)'
  })
  @MaxLength(20, {
    message: 'Username is too long (more than 20 characters)'
  })
  readonly username: string;

  @IsEmail()
  @MinLength(10, {
    message: 'Invalid email address'
  })
  @MaxLength(50, {
    message: 'Invalid email address'
  })
  readonly email: string;

  @IsString()
  @MaxLength(100, {
    message: 'Password is too long (more than 100 characters)'
  })
  readonly password: string;
}