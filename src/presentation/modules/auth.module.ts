/** @format */

import { Module } from "@nestjs/common";
import { SignUpUseCase } from "../../application/usecases/UserUsecases/index";
import { AuthServiceImpl } from "src/infrastructor/services/auth.service.impl";
import { UserServiceImpl } from "src/infrastructor/services/user.service.impl";
import { AuthController } from "../controllers/auth.controller";
import { UserRepositoryImpl } from "src/infrastructor/repositories/user.repository.impl";
import { UserModule } from "./user.module";
import { MongooseModule } from "@nestjs/mongoose";
import {
    User,
    UserSchema,
} from "src/infrastructor/database/schemas/user.schema";

const ListUsercases = [SignUpUseCase];

const ListServices = [{ provide: "IAuthService", useClass: AuthServiceImpl }];

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [AuthController],
    providers: [...ListUsercases, ...ListServices],
})
export class AuthModule {}
