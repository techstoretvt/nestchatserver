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
import { AppTypeMiddleware } from "src/middleware/app.middleware";

const ListUsercases = [SignUpUseCase, SignInUseCase];

const ListServices = [
    { provide: "IAuthService", useClass: AuthServiceImpl },
    { provide: "IUserRepository", useClass: UserRepositoryImpl },
    { provide: "IUserService", useClass: UserServiceImpl },
];

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            global: true,
            secret: jwtTokenConstants.accessTokenSecret,
            signOptions: { expiresIn: jwtTokenConstants.accessTokenExp },
        }),
    ],
    controllers: [AuthController],
    providers: [...ListUsercases, ...ListServices],
    exports: ["IAuthService", "IUserService", "IUserRepository"],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AppTypeMiddleware).forRoutes("auth/signin");
    }
}
