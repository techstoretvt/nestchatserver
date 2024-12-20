/** @format */

import {
    forwardRef,
    MiddlewareConsumer,
    Module,
    NestModule,
} from "@nestjs/common";
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
import { RoleModule } from "./role.module";
import { RoleResitoryImpl } from "src/infrastructor/repositories/role.repository.impl";
import {
    Role,
    RoleSchema,
} from "src/infrastructor/database/schemas/role.schema";
import {
    Permission,
    PermissionSchema,
} from "src/infrastructor/database/schemas/permission.schema";
import { TestUsecase } from "src/application/usecases/UserUsecases";
import { UpdateUserUsecase } from "src/application/usecases/UserUsecases/update-user.usecase";
import { AuthModule } from "./auth.module";
import { AddDefaultSettingUseCase } from "src/application/usecases/UserUsecases/add-default-setting.usecase";

const ListUsercases = [
    TestUsecase,
    UpdateUserUsecase,
    UpdateUserUsecase,
    AddDefaultSettingUseCase,
];

const ListServices = [];

const ListRepositories = [
    {
        provide: "IUserRepository",
        useClass: UserRepositoryImpl,
    },
    {
        provide: "IRoleRepository",
        useClass: RoleResitoryImpl,
    },
];

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Role.name, schema: RoleSchema },
            {
                name: Permission.name,
                schema: PermissionSchema,
            },
        ]),
        cacheConfig(),
        RoleModule,
        forwardRef(() => AuthModule),
    ],
    controllers: [UserController],
    providers: [...ListUsercases, ...ListServices, ...ListRepositories],
    exports: ["IUserRepository", "IRoleRepository"],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes("*");
    }
}
