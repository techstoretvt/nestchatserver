/** @format */

import { UserEntity } from "src/domain/entities/user.entity";
import { CreateUserDto } from "src/presentation/dtos/create_user.dto";
import { Inject, Injectable } from "@nestjs/common";
import { IAuthService } from "src/domain/interfaces/services/auth.service.interface";
import { IUserService } from "src/domain/interfaces/services/user.service.interface";

@Injectable()
export class AuthServiceImpl implements IAuthService {
    constructor(
        @Inject("IUserService") private readonly userService: IUserService,
    ) {}

    async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
        return await this.userService.createUser(createUserDto);
    }
}
