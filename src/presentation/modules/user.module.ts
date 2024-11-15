/** @format */

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserController } from "../controllers/user.controller";
import { UserRepositoryImpl } from "../../infrastructor/repositories/user.repository.impl";
import { CreateUserUseCase } from "../../domain/usecases/UserUsecases/create-user.usecase";
import { LoggerMiddleware } from "../../middleware/logger.middleware";
import { MongooseModule } from "@nestjs/mongoose";
import {
    User,
    UserSchema,
} from "src/infrastructor/database/schemas/user.schema";
import { CacheModule } from "@nestjs/cache-manager";
import { CacheConstants } from "src/common/constants/cache.constant";
import { CqrsModule } from "@nestjs/cqrs";

const ListUsercases = [CreateUserUseCase];

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        CacheModule.register({
            ttl: CacheConstants.CACHE_EXPIRED,
            max: CacheConstants.MAX_RESULT,
        }),
        CqrsModule,
    ],
    controllers: [UserController],
    providers: [
        ...ListUsercases,
        {
            provide: "UserRepository",
            useClass: UserRepositoryImpl,
        },
    ],
    exports: ["UserRepository", CreateUserUseCase],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
