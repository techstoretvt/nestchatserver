/** @format */

import { ApiProperty } from "@nestjs/swagger";
import {
    IsBoolean,
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
    MinLength,
} from "class-validator";

export class UpdateUserDto {
    @IsString()
    @MinLength(3, { message: "Full name must be at least 3 characters long" })
    @IsOptional()
    @ApiProperty({
        description: "The full name of the user",
        example: "John Doe",
    })
    full_name?: string;

    @IsEmail()
    @IsOptional()
    @ApiProperty({
        description: "The email of the user",
        example: "L1FtF@example.com",
    })
    email?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: "The avatar of the user",
        example: "https://example.com/avatar.jpg",
    })
    avatar?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: "The password of the user",
        example: "Password1234567",
    })
    hash_password?: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: "The last login of the user",
        example: "1234567890",
    })
    last_login?: number;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        description: "The is_online of the user",
        example: "true",
    })
    is_online?: boolean;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        description: "The last_seen of the user",
        example: "1234567890",
    })
    last_seen?: number;
}
