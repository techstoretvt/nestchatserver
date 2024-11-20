/** @format */

import { UserEntity } from "src/domain/entities/user.entity";
import { Injectable } from "@nestjs/common";
import { IAuthService } from "src/domain/interfaces/services/auth.service.interface";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { jwtTokenConstants } from "src/common/constants/jwt.constant";
import Redis from "ioredis";
import { RedisService } from "@liaoliaots/nestjs-redis";
import { getUserRefreshTokenKey } from "src/common/utils/redis.utils";

@Injectable()
export class AuthServiceImpl implements IAuthService {
    private readonly redis: Redis | null;
    constructor(
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
    ) {
        this.redis = this.redisService.getOrThrow();
    }
    async saveRefreshToken(
        userId: string,
        refreshToken: string,
        client_id: string,
    ): Promise<void> {
        await this.redis.set(
            getUserRefreshTokenKey(userId, client_id),
            refreshToken,
            "EX",
            jwtTokenConstants.refreshTokenExpNumber,
        );
    }

    createAccessToken(userEntity: UserEntity): string {
        const payload = { id: userEntity._id, role: userEntity.role };
        return this.jwtService.sign(payload); // JWT được tạo ở đây
    }
    createRefreshToken(userEntity: UserEntity): string {
        const payload = { id: userEntity._id, role: userEntity.role };
        return this.jwtService.sign(payload, {
            secret: jwtTokenConstants.refreshTokenSecret,
            expiresIn: jwtTokenConstants.refreshTokenExp,
        });
    }
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async comparePassword(password: string, hashed: string): Promise<boolean> {
        return await bcrypt.compare(password, hashed);
    }
}
