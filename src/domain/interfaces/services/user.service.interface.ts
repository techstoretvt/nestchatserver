/** @format */

import { UserEntity } from "src/domain/entities/user.entity";
import { CreateUserDto } from "src/presentation/dtos/create_user.dto";

export interface IUserService {
    createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
}
