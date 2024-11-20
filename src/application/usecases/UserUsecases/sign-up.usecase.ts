/** @format */

import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { RoleNameConstants } from "src/common/constants";
import { UserEntity } from "src/domain/entities/user.entity";
import {
    IRoleRepository,
    IUserRepository,
} from "src/domain/interfaces/repositories";
import { IAuthService } from "src/domain/interfaces/services/auth.service.interface";
import { CreateUserDto } from "src/presentation/dtos/create-user.dto";

@Injectable()
export class SignUpUseCase {
    constructor(
        @Inject("IAuthService") private readonly authService: IAuthService,
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
        @Inject("IRoleRepository")
        private readonly roleRepository: IRoleRepository,
    ) {}

    async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
        let user = await this.userRepository.getUserByUsername(
            createUserDto.username,
        );

        if (user) {
            throw new ConflictException("Username already exists");
        }
        const hashPassword = await this.authService.hashPassword(
            createUserDto.password,
        );
        createUserDto.password = hashPassword;

        let userRole = await this.roleRepository.getRoleByName(
            RoleNameConstants.USER,
        );

        return await this.userRepository.createUser(
            createUserDto,
            userRole._id.toString(),
        );
    }
}
