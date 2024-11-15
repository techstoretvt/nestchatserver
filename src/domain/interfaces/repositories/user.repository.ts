/** @format */

import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
    save(user: UserEntity): Promise<UserEntity>;
    findById(id: String): Promise<UserEntity>;
    create(user: UserEntity): Promise<UserEntity>;
}
