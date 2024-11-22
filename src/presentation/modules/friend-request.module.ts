/** @format */

import { Module } from "@nestjs/common";
import { FriendRequestController } from "../controllers/friend-request.controller";
import { FriendRequestRepositoryImpl } from "src/infrastructor/repositories/friend-request.repository.impl";
import { MongooseModule } from "@nestjs/mongoose";
import {
    FriendRequest,
    FriendRequestSchema,
} from "src/infrastructor/database/schemas/friend-request.schema";
import { SendRequestUseCase } from "src/application/usecases/FriendRequest/send-request.usecase";
import { AuthModule } from "./auth.module";

const ListFriendRequestUsecase = [SendRequestUseCase];

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: FriendRequest.name, schema: FriendRequestSchema },
        ]),
        AuthModule,
    ],
    controllers: [FriendRequestController],
    providers: [
        ...ListFriendRequestUsecase,
        {
            provide: "IFriendRequestRepository",
            useClass: FriendRequestRepositoryImpl,
        },
    ],
    exports: [],
})
export class FriendRequestMobule {}
