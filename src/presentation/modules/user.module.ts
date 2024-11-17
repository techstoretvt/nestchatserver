/** @format */

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserController } from "../controllers/user.controller";
import { IUserService } from "../../domain/interfaces/services/user.service.interface";
import { UserRepositoryImpl } from "../../infrastructor/repositories/user.repository.impl";
import { LoggerMiddleware } from "../../middleware/logger.middleware";
import { MongooseModule } from "@nestjs/mongoose";
import {
    User,
    UserSchema,
} from "src/infrastructor/database/schemas/user.schema";
import { cacheConfig } from "src/configs/cache.config";
import { UserServiceImpl } from "src/infrastructor/services/user.service.impl";

const ListUsercases = [];

const ListServices = [
    {
        provide: "IUserService",
        useClass: UserServiceImpl,
    },
];

const ListRepositories = [
    {
        provide: "IUserRepository",
        useClass: UserRepositoryImpl,
    },
];

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        cacheConfig(),
    ],
    controllers: [UserController],
    providers: [...ListUsercases, ...ListServices, ...ListRepositories],
    exports: ["IUserRepository", "IUserService"],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
