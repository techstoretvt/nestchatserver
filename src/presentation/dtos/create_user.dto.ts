/** @format */

import { IsString, MinLength, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    password: string;
}
