/** @format */

import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";
import { IAuthService } from "src/domain/interfaces/services/auth.service.interface";
import { IUserService } from "src/domain/interfaces/services/user.service.interface";
import { CreateUserDto } from "src/presentation/dtos/create-user.dto";

@Injectable()
export class SignUpUseCase {
    constructor(
        @Inject("IAuthService") private readonly authService: IAuthService,
        @Inject("IUserService") private readonly userService: IUserService,
    ) {}

    async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
        let user = await this.userService.getUserByUsername(
            createUserDto.username,
        );

        if (user) {
            throw new ConflictException("Username already exists");
        }
        const hashPassword = await this.authService.hashPassword(
            createUserDto.password,
        );
        return await this.userService.createUser({
            ...createUserDto,
            password: hashPassword,
        });
    }
}
