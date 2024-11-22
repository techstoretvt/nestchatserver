/** @format */

import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { StatusFriendRequest } from "src/common/constants";
import { FriendRequestEntity } from "src/domain/entities/friend-request.entity";
import { IUserRepository } from "src/domain/interfaces/repositories";
import { IFriendRequestRepository } from "src/domain/interfaces/repositories/friend-request.repository.interface";
import { SendRequestDto } from "src/presentation/dtos/send-request.dto";

@Injectable()
export class SendRequestUseCase {
    constructor(
        @Inject("IFriendRequestRepository")
        private readonly friendRequestRepository: IFriendRequestRepository,
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
    ) {}
    async execute(
        user_id: string,
        sendRequestDto: SendRequestDto,
    ): Promise<FriendRequestEntity> {
        const friend = await this.userRepository.getFriendByFriendId(
            user_id,
            sendRequestDto.receiver_id,
        );

        if (friend?.is_friend) {
            throw new ConflictException("You are already friends");
        }

        let friendRequestTypePending: FriendRequestEntity =
            await this.friendRequestRepository.getRequseFromUserToFriend(
                user_id,
                sendRequestDto.receiver_id,
                StatusFriendRequest.PENDING,
            );

        let friendRequestTypeAccepted: FriendRequestEntity =
            await this.friendRequestRepository.getRequseFromUserToFriend(
                user_id,
                sendRequestDto.receiver_id,
                StatusFriendRequest.ACCEPTED,
            );

        if (friendRequestTypePending || friendRequestTypeAccepted) {
            throw new ConflictException("Friend request already exists");
        }

        let newFriendRequest: FriendRequestEntity =
            await this.friendRequestRepository.sendRequest(
                user_id,
                sendRequestDto,
            );
        return newFriendRequest;
    }
}
