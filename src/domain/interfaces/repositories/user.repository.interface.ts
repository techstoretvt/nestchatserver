/** @format */

import { CreateUserDto } from "src/presentation/dtos/create-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { UpdateUserDto } from "src/presentation/dtos/update-user.dto";
import { FriendEntity } from "src/domain/entities/friend.entity";

export interface IUserRepository {
    getUserByUsername(username: string): Promise<UserEntity>;
    createUser(user: CreateUserDto, role_id: string): Promise<UserEntity>;
    getUserById(user_id: string): Promise<UserEntity>;
    createSuperAdmin(): Promise<void>;
    seedUser(data?: any): Promise<void>;
    updateUser(
        updateUserDto: UpdateUserDto,
        user_id: string,
    ): Promise<UserEntity>;
    addFriend(user_id: string, friend_id: string): Promise<FriendEntity>;
}
