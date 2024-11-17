/** @format */

import { UserEntity } from "src/domain/entities/user.entity";
import { CreateUserDto } from "src/presentation/dtos/create_user.dto";

export interface IAuthService {
    signUp(createUserDto: CreateUserDto): Promise<UserEntity>;
}
