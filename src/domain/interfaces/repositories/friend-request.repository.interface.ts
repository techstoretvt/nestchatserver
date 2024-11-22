/** @format */

import { Injectable } from "@nestjs/common";
import { FriendRequestEntity } from "src/domain/entities/friend-request.entity";
import { SendRequestDto } from "src/presentation/dtos/send-request.dto";

export interface IFriendRequestRepository {
    sendRequest(
        user_id: string,
        friendRequestDto: SendRequestDto,
    ): Promise<FriendRequestEntity>;
    getRequseFromUserToFriend(
        user_id: string,
        friend_id: string,
        status: string,
    ): Promise<FriendRequestEntity>;
}
