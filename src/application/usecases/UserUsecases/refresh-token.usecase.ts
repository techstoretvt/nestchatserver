/** @format */

import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { TokenEntity } from "src/domain/entities/token.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { IUserRepository } from "src/domain/interfaces/repositories";
import { IAuthService } from "src/domain/interfaces/services";

@Injectable()
export class RefreshTokenUseCase {
    constructor(
        @Inject("IAuthService") private readonly authService: IAuthService,
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
    ) {}

    async execute(
        refreshToken: string,
        client_id: string,
    ): Promise<TokenEntity> {
        if (!refreshToken) {
            throw new UnauthorizedException(
                "Invalid or missing refresh token.",
            );
        }
        let decodeToken =
            await this.authService.verifyRefreshToken(refreshToken);

        // check token in redis
        const checkToken = await this.authService.checkTokenInRedis(
            decodeToken.id,
            client_id,
            refreshToken,
        );

        if (!checkToken) {
            throw new UnauthorizedException("Token not found in Redis");
        }

        // create new tokens
        let userEntity = new UserEntity();
        userEntity._id = decodeToken.id;
        userEntity.role = decodeToken.role;
        const newAccessToken = this.authService.createAccessToken(userEntity);
        const newRefreshToken = this.authService.createRefreshToken(userEntity);

        // save new refresh token
        await this.authService.saveRefreshToken(
            decodeToken.id,
            newRefreshToken,
            client_id,
        );

        // create token entity
        const tokenEntity: TokenEntity = {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };

        return tokenEntity;
    }
}
