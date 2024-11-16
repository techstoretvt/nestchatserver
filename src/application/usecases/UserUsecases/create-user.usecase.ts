/** @format */

import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "../../../domain/entities/user.entity";
import { UserRepository } from "src/domain/interfaces/repositories/user.repository";
import { plainToInstance } from "class-transformer";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject("UserRepository")
        private readonly userRepository: UserRepository,
    ) {}

    async execute(name: string, email: string): Promise<UserEntity> {
        try {
            const user = plainToInstance(UserEntity, {
                id: Date.now().toString(),
                name,
                email,
            });
            return await this.userRepository.create(user);
        } catch (error) {
            console.log("vao catch usecase");
            throw new HttpException(
                "Something went wrong!",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
