/** @format */

import { Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "src/domain/entities/user.entity";
import { IAuthService } from "src/domain/interfaces/services/auth.service.interface";
import { CreateUserDto } from "src/presentation/dtos/create_user.dto";

@Injectable()
export class SignUpUseCase {
    constructor(
        @Inject("IAuthService") private readonly authService: IAuthService,
    ) {}

    async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
        return await this.authService.signUp(createUserDto);
    }
}
