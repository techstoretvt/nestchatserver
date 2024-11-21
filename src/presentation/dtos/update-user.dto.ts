/** @format */

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
    full_name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    avatar?: string;

    @IsString()
    @IsOptional()
    hash_password?: string;

    @IsNumber()
    @IsOptional()
    last_login?: number;

    @IsBoolean()
    @IsOptional()
    is_online?: boolean;

    @IsNumber()
    @IsOptional()
    last_seen?: number;
}
