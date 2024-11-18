/** @format */

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @IsString()
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
