/** @format */

import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus,
    Get,
    UseInterceptors,
    Inject,
    Param,
    Patch,
    Request,
    UseGuards,
} from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { ThrottlerConstants } from "src/common/constants/throttler.constant";
import {
    CacheInterceptor,
    CACHE_MANAGER,
    CacheKey,
} from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { CacheConstants } from "src/common/constants/cache.constant";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { TestUsecase } from "src/application/usecases/UserUsecases";
import { UpdateUserDto } from "../dtos";
import { ResponseJsonUtils } from "src/common/utils/response-json.utils";
import { AuthGuard } from "src/middleware/guards/auth.guard";
import { UpdateUserUsecase } from "src/application/usecases/UserUsecases/update-user.usecase";

@Controller("users")
export class UserController {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly testUseCase: TestUsecase,
        private readonly updateUserUseCase: UpdateUserUsecase,
    ) {}

    @Get()
    @ApiOperation({ summary: "Get all users" }) // Mô tả endpoint
    @ApiResponse({ status: 200, description: "The list of users" })
    @Throttle({
        default: {
            limit: ThrottlerConstants.MESSAGE_ROUTE_LIMIT,
            ttl: ThrottlerConstants.MESSAGE_ROUTE_TTL,
        },
    })
    @UseInterceptors(CacheInterceptor)
    @CacheKey(CacheConstants.GET_USERR)
    async getUser() {
        console.log("Get user...");
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return {
            message: "OK",
        };
    }

    @Patch("/update")
    @UseGuards(AuthGuard)
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req) {
        let data = await this.updateUserUseCase.execute(
            updateUserDto,
            req.user_id,
        );
        return ResponseJsonUtils(HttpStatus.OK, "OK", data);
    }

    @Post("/test/:id")
    async test(@Body("") body: any, @Param("id") id: string) {
        let data = await this.testUseCase.execute(id, body.friend_id);
        return {
            message: "oke",
            data,
        };
    }
}
