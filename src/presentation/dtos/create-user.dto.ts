/** @format */

import { IsString, MinLength, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @IsString()
    @MinLength(3, { message: "Username must be at least 3 characters long" })
    @IsNotEmpty()
    @ApiProperty({
        description: "The username of the user",
        example: "john_doe",
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: "The password of the user",
        example: "Password1234567",
    })
    password: string;
}
