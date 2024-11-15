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
import { CreateUserUseCase } from "../../domain/usecases/UserUsecases/create-user.usecase";
import { Throttle } from "@nestjs/throttler";
import { ThrottlerConstants } from "src/common/constants/throttler.constant";
import {
    CacheInterceptor,
    CACHE_MANAGER,
    CacheKey,
} from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { CacheConstants } from "src/common/constants/cache.constant";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateUserCommand } from "src/application/commands/create-user.command";

@Controller("users")
@UseInterceptors(CacheInterceptor)
export class UserController {
    // constructor(
    //     private readonly createUserUseCase: CreateUserUseCase,
    //     @Inject(CACHE_MANAGER) private cacheManager: Cache,
    // ) {}

    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    @Get()
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
    async createUser(@Body() body: { name: string; email: string }) {
        try {
            // let data = this.createUserUseCase.execute(body.name, body.email);
            let data = await this.commandBus.execute(
                new CreateUserCommand(body.name, body.email),
            );

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
