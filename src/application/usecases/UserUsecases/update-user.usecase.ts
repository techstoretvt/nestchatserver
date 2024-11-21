/** @format */

import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PasswordUtils } from "src/common/utils/password.utils";
import { UserEntity } from "src/domain/entities/user.entity";
import { IUserRepository } from "src/domain/interfaces/repositories";
import { IAuthService } from "src/domain/interfaces/services";
import { UpdateUserDto } from "src/presentation/dtos";

@Injectable()
export class UpdateUserUsecase {
    constructor(
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
        @Inject("IAuthService") private readonly authService: IAuthService,
    ) {}

    async execute(
        updateUserDto: UpdateUserDto,
        user_id: string,
    ): Promise<UserEntity> {
        const user = await this.userRepository.getUserById(user_id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (updateUserDto.hash_password) {
            const checkPassword = PasswordUtils.validatePassword(
                updateUserDto.hash_password,
            );
            if (checkPassword?.length > 0) {
                throw new BadRequestException(checkPassword[0].message);
            }
            updateUserDto.hash_password = await this.authService.hashPassword(
                updateUserDto.hash_password,
            );
        }

        return await this.userRepository.updateUser(updateUserDto, user_id);
    }
}
