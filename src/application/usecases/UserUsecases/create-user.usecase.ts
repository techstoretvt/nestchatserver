/** @format */

import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UserEntity } from "../../../domain/entities/user.entity";
import { UserRepository } from "src/domain/interfaces/repositories/user.repository";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "src/application/commands/create-user.command";

// @Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserUseCase implements ICommandHandler<CreateUserCommand> {
    constructor(
        @Inject("UserRepository")
        private readonly userRepository: UserRepository,
    ) {}

    async execute(command: CreateUserCommand): Promise<UserEntity> {
        try {
            const user = new UserEntity(
                Date.now().toString(),
                command.name,
                command.email,
            );
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
