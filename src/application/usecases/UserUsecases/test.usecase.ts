/** @format */

import { Inject, Injectable } from "@nestjs/common";
import { FriendEntity } from "src/domain/entities/friend.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { IUserRepository } from "src/domain/interfaces/repositories";
import { UpdateUserDto } from "src/presentation/dtos";

@Injectable()
export class TestUsecase {
    constructor(
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
    ) {}

    async execute(user_id: string, friend_id: string): Promise<FriendEntity> {
        return await this.userRepository.addFriend(user_id, friend_id);
    }
}
