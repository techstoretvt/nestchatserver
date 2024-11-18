/** @format */

import { UserEntity } from "src/domain/entities/user.entity";
import { CreateUserDto } from "src/presentation/dtos/create-user.dto";
import { IUserRepository } from "../../domain/interfaces/repositories/user.repository.interface";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IUserService } from "src/domain/interfaces/services/user.service.interface";
import { JwtService } from "@nestjs/jwt";
import { jwtTokenConstants } from "src/common/constants/jwt.constant";

@Injectable()
export class UserServiceImpl implements IUserService {
    constructor(
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
        private readonly jwtService: JwtService,
    ) {}
    async getUserById(user_id: string): Promise<UserEntity> {
        return await this.userRepository.getUserById(user_id);
    }
    async createAccessToken(userEntity: UserEntity): Promise<string> {
        const payload = { id: userEntity._id, role: userEntity.role };
        return this.jwtService.sign(payload); // JWT được tạo ở đây
    }
    async createRefreshToken(userEntity: UserEntity): Promise<string> {
        const payload = { id: userEntity._id, role: userEntity.role };
        return this.jwtService.sign(payload, {
            secret: jwtTokenConstants.refreshTokenSecret,
            expiresIn: jwtTokenConstants.refreshTokenExp,
        });
    }
    async updateUserLastLogin(user_id: string): Promise<void> {
        await this.userRepository.updateUserLastLogin(user_id);
    }

    async getUserByUsername(username: string): Promise<UserEntity> {
        return await this.userRepository.getUserByUsername(username);
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        let user = await this.getUserByUsername(createUserDto.username);

        if (user) {
            throw new ConflictException("Username already exists");
        }
        return await this.userRepository.createUser(createUserDto);
    }
}
