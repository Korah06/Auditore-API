import { IsEmail, MinLength } from "class-validator";

export class LoginAuthDto {
    @IsEmail()
    email: string;

    @MinLength(4)
    password: string
}
