/** @format */

import { UserEntity } from "src/domain/entities/user.entity";
import { CreateUserDto } from "src/presentation/dtos/create_user.dto";
import { IUserRepository } from "../../domain/interfaces/repositories/user.repository.interface";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { IUserService } from "src/domain/interfaces/services/user.service.interface";

@Injectable()
export class UserServiceImpl implements IUserService {
    constructor(
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        let user = await this.userRepository.getUserByUsername(
            createUserDto.username,
        );

        if (user) {
            throw new ConflictException("Username already exists");
        }
        return await this.userRepository.createUser(createUserDto);
    }
}
