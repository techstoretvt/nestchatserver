/** @format */

import { UserEntity } from "src/domain/entities/user.entity";

export interface IAuthService {
    comparePassword(password: string, hashed: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}
