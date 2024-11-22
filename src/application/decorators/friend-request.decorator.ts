/** @format */

import {
    applyDecorators,
    HttpCode,
    HttpStatus,
    UseGuards,
} from "@nestjs/common";
import {
    ApiBasicAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "src/middleware/guards/auth.guard";
import { SendRequestDto } from "src/presentation/dtos/send-request.dto";

export const SendRequestDecorator = () => {
    return applyDecorators(
        HttpCode(HttpStatus.CREATED),
        ApiOperation({ summary: "Send friend request" }),
        ApiBody({ type: SendRequestDto }),
        ApiBasicAuth(),
        ApiResponse({
            status: HttpStatus.CREATED,
            description: "Send friend request successfully",
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
        ApiResponse({
            status: HttpStatus.CONFLICT,
            description: "Friend request already sent",
        }),
        ApiResponse({
            status: HttpStatus.FORBIDDEN,
            description: "You cannot send a friend request to yourself",
        }),
        UseGuards(AuthGuard),
    );
};
