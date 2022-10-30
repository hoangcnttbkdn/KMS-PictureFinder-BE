import { IsEmail, IsString, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  @IsOptional()
  fullName: string
}
