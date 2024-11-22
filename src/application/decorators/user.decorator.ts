/** @format */

import { CacheInterceptor, CacheKey } from "@nestjs/cache-manager";
import {
    applyDecorators,
    HttpStatus,
    SetMetadata,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiResponse,
} from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import {
    CacheConstants,
    RoleNameConstants,
    ThrottlerConstants,
} from "src/common/constants";
import { AuthGuard } from "src/middleware/guards/auth.guard";
import { RolesGuard } from "src/middleware/guards/roles.guard";
import { UpdateUserDto } from "src/presentation/dtos";
import { UpdateSettingUserDto } from "src/presentation/dtos/update-setting-user.dto";

export const GetAllUserDecorator = () => {
    return applyDecorators(
        ApiOperation({ summary: "Get all users" }), // Mô tả endpoint
        ApiResponse({ status: 200, description: "The list of users" }),
        Throttle({
            default: {
                limit: ThrottlerConstants.MESSAGE_ROUTE_LIMIT,
                ttl: ThrottlerConstants.MESSAGE_ROUTE_TTL,
            },
        }),
        UseInterceptors(CacheInterceptor),
        CacheKey(CacheConstants.GET_USERR),
    );
};

export const UpdateUserDecorator = () => {
    return applyDecorators(
        ApiOperation({ summary: "Update user" }),
        ApiBearerAuth(),
        ApiBody({ type: UpdateUserDto }),
        ApiResponse({
            status: HttpStatus.OK,
            description: "Update user successfully",
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: "Bad request",
        }),
        ApiResponse({
            status: HttpStatus.UNAUTHORIZED,
            description: "Unauthorized",
        }),
        ApiResponse({
            status: HttpStatus.NOT_FOUND,
            description: "User not found",
        }),
        UseGuards(AuthGuard),
    );
};

export const UpdateSettingDecorator = () => {
    return applyDecorators(
        ApiOperation({ summary: "Add default setting all user" }),
        ApiBearerAuth(),
        ApiBody({ type: UpdateSettingUserDto }),
        ApiResponse({
            status: HttpStatus.OK,
            description: "Add default setting successfully",
        }),
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: "Bad request",
        }),
        ApiResponse({
            status: HttpStatus.UNAUTHORIZED,
            description: "Unauthorized",
        }),
        ApiResponse({
            status: HttpStatus.NO_CONTENT,
            description: "No changes made",
        }),
        SetMetadata("roles", [
            RoleNameConstants.ADMIN,
            RoleNameConstants.SUPERADMIN,
        ]),
        UseGuards(AuthGuard, RolesGuard),
    );
};
