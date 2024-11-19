/** @format */

import { CreateUserDto } from "src/presentation/dtos/create-user.dto";
import { UserEntity } from "../../entities/user.entity";

export interface IUserRepository {
    getUserByUsername(username: string): Promise<UserEntity>;
    createUser(user: CreateUserDto): Promise<UserEntity>;
    updateUserLastLogin(user_id: string): Promise<void>;
    getUserById(user_id: string): Promise<UserEntity>;
    createSuperAdmin(): Promise<void>;
    seedUser(data?: any): Promise<void>;
}
