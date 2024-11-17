/** @format */

import { CreateUserDto } from "src/presentation/dtos/create_user.dto";
import { UserEntity } from "../../entities/user.entity";

export interface IUserRepository {
    getUserByUsername(username: string): Promise<UserEntity>;
    createUser(user: CreateUserDto): Promise<UserEntity>;
}
