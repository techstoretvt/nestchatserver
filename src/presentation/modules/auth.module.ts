/** @format */

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { SignUpUseCase } from "../../application/usecases/UserUsecases/index";
import {
    AuthServiceImpl,
    UserServiceImpl,
} from "src/infrastructor/services/index";
import { AuthController } from "../controllers/auth.controller";
import { UserRepositoryImpl } from "src/infrastructor/repositories/index";
import { UserModule } from "./user.module";
import { MongooseModule } from "@nestjs/mongoose";
import {
    User,
    UserSchema,
} from "src/infrastructor/database/schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { jwtTokenConstants } from "src/common/constants/jwt.constant";
import { SignInUseCase } from "src/application/usecases/UserUsecases/sign-in.usecase";
import {
    AppTypeMiddleware,
    ClientIDMiddleware,
} from "src/middleware/app.middleware";
import { RefreshTokenUseCase } from "src/application/usecases/UserUsecases/refresh-token.usecase";
import { ConfigService } from "@nestjs/config";
import { LogoutUsecase } from "src/application/usecases/UserUsecases/logout.usecase";

const ListUsercases = [
    SignUpUseCase,
    SignInUseCase,
    RefreshTokenUseCase,
    LogoutUsecase,
];

const ListServices = [
    { provide: "IAuthService", useClass: AuthServiceImpl },
    { provide: "IUserRepository", useClass: UserRepositoryImpl },
];

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>("ACCESS_TOKEN_SECRET"),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [...ListUsercases, ...ListServices],
    exports: ["IAuthService", "IUserRepository"],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AppTypeMiddleware, ClientIDMiddleware)
            .forRoutes("auth/signin");

        consumer
            .apply(AppTypeMiddleware, ClientIDMiddleware)
            .forRoutes("auth/refresh");

        consumer.apply(ClientIDMiddleware).forRoutes("auth/logout");
    }
}
