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
} from "@nestjs/common";
import { CreateUserUseCase } from "../../application/usecases/UserUsecases/create-user.usecase";
import { Throttle } from "@nestjs/throttler";
import { ThrottlerConstants } from "src/common/constants/throttler.constant";
import {
    CacheInterceptor,
    CACHE_MANAGER,
    CacheKey,
} from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { CacheConstants } from "src/common/constants/cache.constant";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBody,
    ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
@UseInterceptors(CacheInterceptor)
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
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

    @Post()
    @ApiOperation({ summary: "Create a new user" })
    @ApiBody({ description: "User data", type: Object })
    @ApiResponse({ status: 201, description: "User created successfully" })
    @ApiBearerAuth()
    async createUser(@Body() body: { name: string; email: string }) {
        try {
            let data = this.createUserUseCase.execute(body.name, body.email);

            await this.cacheManager.del(CacheConstants.GET_USERR);
            return data;
        } catch (error) {
            // Handle and log the error, then return a friendly message
            console.log("vao catch");

            console.error(error); // Log lỗi ra console

            // Trả về lỗi thông qua HttpException
            throw new HttpException(
                "Something went wrong!",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
