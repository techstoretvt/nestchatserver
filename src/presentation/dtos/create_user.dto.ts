/** @format */

import { IsString, IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    // constructor(
    //     public id: string,
    //     public name: string,
    //     public email: string,
    // ) { }

    @IsString()
    id: string;

    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @IsEmail()
    email: string;
}
