/** @format */

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FriendRequestEntity } from "src/domain/entities/friend-request.entity";
import { IFriendRequestRepository } from "src/domain/interfaces/repositories/friend-request.repository.interface";
import { SendRequestDto } from "src/presentation/dtos/send-request.dto";
import { FriendRequest } from "../database/schemas/friend-request.schema";
import { Model, Types } from "mongoose";
import { StatusFriendRequest } from "src/common/constants";

@Injectable()
export class FriendRequestRepositoryImpl implements IFriendRequestRepository {
    constructor(
        @InjectModel(FriendRequest.name)
        private friendRequestModel: Model<FriendRequest>,
    ) {}

    async getRequseFromUserToFriend(
        user_id: string,
        friend_id: string,
        status: string,
    ): Promise<FriendRequestEntity> {
        const filters = {
            sender_id: new Types.ObjectId(user_id),
            receiver_id: new Types.ObjectId(friend_id),
        };
        if (status) filters["status"] = status;

        const friendRequest = await this.friendRequestModel.findOne(filters);
        if (!friendRequest) return null;

        const FriendRequestEntity: FriendRequestEntity = {
            _id: friendRequest._id.toString(),
            sender_id: friendRequest.sender_id.toString(),
            receiver_id: friendRequest.receiver_id.toString(),
            request_message: friendRequest.request_message,
            status: friendRequest.status,
            response_time: friendRequest.response_time,
        };

        return FriendRequestEntity;
    }

    async sendRequest(
        user_id: string,
        friendRequestDto: SendRequestDto,
    ): Promise<FriendRequestEntity> {
        const messageRequest =
            friendRequestDto.request_message || "Hello, can we be friends?";

        const friendRequest = new this.friendRequestModel({
            sender_id: new Types.ObjectId(user_id),
            receiver_id: new Types.ObjectId(friendRequestDto.receiver_id),
            request_message: messageRequest,
            status: StatusFriendRequest.PENDING,
            response_time: Date.now(),
        });
        await friendRequest.save();
        console.log("friendRequest", friendRequest);

        return null;
    }
}
