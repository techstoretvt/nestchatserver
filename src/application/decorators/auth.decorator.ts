/** @format */

import {
    applyDecorators,
    HttpCode,
    HttpStatus,
    UseGuards,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiBody,
    ApiHeader,
    ApiOperation,
    ApiResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "src/middleware/guards/auth.guard";
import { CreateUserDto, SignInDto } from "src/presentation/dtos";

export const SignUpDecorator = () => {
    return applyDecorators(
        HttpCode(HttpStatus.CREATED),
        ApiOperation({ summary: "Sign up" }),
        ApiBody({ type: CreateUserDto }),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: "Create user successfully",
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: "Bad Request",
        }),
        ApiResponse({
            status: HttpStatus.CONFLICT,
            description: "User already exists",
        }),
    );
};

export const SignInDecorator = () => {
    return applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: "Sign in" }),
        ApiBody({ type: SignInDto }),
        ApiHeader({
            name: "x-app-type",
            required: true,
            description: "The app type (Web, Mobile, Desktop)",
            example: "Web",
        }),
        ApiHeader({
            name: "x-client-id",
            required: true,
            description: "The client id",
            example: "client_id",
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: "Sign in successfully",
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: "Bad Request",
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: "User not found",
        }),
        ApiResponse({
            status: HttpStatus.UNAUTHORIZED,
            description: "Unauthorized",
        }),
    );
};

export const RefreshTokenDecorator = () => {
    return applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: "Refresh Token" }),
        ApiHeader({
            name: "x-app-type",
            required: true,
            description: "The app type (Web, Mobile, Desktop)",
            example: "Web",
        }),
        ApiHeader({
            name: "x-client-id",
            required: true,
            description: "The client id",
            example: "client_id",
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: "Sign in successfully",
        }),
        ApiResponse({
            status: HttpStatus.UNAUTHORIZED,
            description: "Invalid or missing refresh token.",
        }),
        ApiResponse({
            status: HttpStatus.FORBIDDEN,
            description: "You do not have permission to refresh the token.",
        }),
    );
};

export const LogoutDecorator = () => {
    return applyDecorators(
        UseGuards(AuthGuard),
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: "Logout" }),
        ApiBearerAuth(),
        ApiHeader({
            name: "x-client-id",
            required: true,
            description: "The client id",
            example: "client_id",
        }),
        ApiResponse({
            status: HttpStatus.OK,
            description: "Logout successfully",
        }),
        ApiResponse({
            status: HttpStatus.UNAUTHORIZED,
            description: "Unauthorized",
        }),
    );
};
