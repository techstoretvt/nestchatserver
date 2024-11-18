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

@Injectable()
export class SignInUseCase {
    constructor(
        @Inject("IAuthService") private readonly authService: IAuthService,
        @Inject("IUserService") private readonly userService: IUserService,
        private jwtService: JwtService,
    ) {}

    async execute(signInDto: SignInDto) {
        let user: UserEntity = await this.userService.getUserByUsername(
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

        // update user
        const userId = new mongoose.Types.ObjectId(user._id);
        await this.userService.updateUserLastLogin(userId.toString());

        // create tokens
        const accessToken = await this.userService.createAccessToken(user);
        const refreshToken = await this.userService.createRefreshToken(user);

        // save refreshToken to http cookie

        // save refreshToken to redis

        return { accessToken, refreshToken };
    }
}
