/** @format */

import {
    Inject,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from "@nestjs/common";
import { PasswordUtils } from "src/common/utils/password.utils";
import { IAuthService } from "src/domain/interfaces/services/auth.service.interface";
import { IUserService } from "src/domain/interfaces/services/user.service.interface";
import { SignInDto } from "src/presentation/dtos/sign-in.dto";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/domain/entities/user.entity";
import mongoose from "mongoose";
import { IUserRepository } from "src/domain/interfaces/repositories";
import { TokenEntity } from "src/domain/entities/token.entity";
import { UpdateUserDto } from "src/presentation/dtos";

@Injectable()
export class SignInUseCase {
    constructor(
        @Inject("IAuthService") private readonly authService: IAuthService,
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
    ) {}

    async execute(
        signInDto: SignInDto,
        client_id: string,
    ): Promise<TokenEntity> {
        let user: UserEntity = await this.userRepository.getUserByUsername(
            signInDto.username,
        );

        if (!user) {
            throw new NotFoundException("User not found");
        }

        // check password
        const checkPassword = await this.authService.comparePassword(
            signInDto.password,
            user.hash_password,
        );
        if (!checkPassword) {
            throw new UnauthorizedException("Invalid password");
        }

        // update last login
        let updatedUser: UpdateUserDto = new UpdateUserDto();
        updatedUser.last_login = new Date().getTime();
        await this.userRepository.updateUser(updatedUser, user._id);

        // create tokens
        const accessToken = this.authService.createAccessToken(user);
        const refreshToken = this.authService.createRefreshToken(user);
        const tokenEntity: TokenEntity = { accessToken, refreshToken };

        // save refresh Token to redis
        this.authService.saveRefreshToken(user._id, refreshToken, client_id);

        return tokenEntity;
    }
}
