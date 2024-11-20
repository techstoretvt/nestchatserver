/** @format */

import { UserEntity } from "src/domain/entities/user.entity";

export interface IAuthService {
    comparePassword(password: string, hashed: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
    createAccessToken(userEntity: UserEntity): string;
    createRefreshToken(userEntity: UserEntity): string;
    saveRefreshToken(
        userId: string,
        refreshToken: string,
        client_id: string,
    ): Promise<void>;
}
