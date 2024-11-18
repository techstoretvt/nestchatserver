/** @format */

import { UserEntity } from "src/domain/entities/user.entity";
import { CreateUserDto } from "src/presentation/dtos/create-user.dto";

export interface IUserService {
    createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
    getUserByUsername(username: string): Promise<UserEntity>;
    updateUserLastLogin(user_id: string): Promise<void>;
    createAccessToken(userEntity: UserEntity): Promise<string>;
    createRefreshToken(userEntity: UserEntity): Promise<string>;
    getUserById(user_id: string): Promise<UserEntity>;
}
