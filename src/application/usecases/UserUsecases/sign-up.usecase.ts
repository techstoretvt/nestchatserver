/** @format */

import {
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
} from "@nestjs/common";
import { RoleNameConstants } from "src/common/constants";
import { PasswordUtils } from "src/common/utils/password.utils";
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
        // check password
        const checkPassword = PasswordUtils.validatePassword(
            createUserDto.password,
        );
        if (checkPassword?.length > 0) {
            throw new BadRequestException(checkPassword[0].message);
        }

        // get user
        let user = await this.userRepository.getUserByUsername(
            createUserDto.username,
        );

        if (user) {
            throw new ConflictException("Username already exists");
        }

        // hash password
        const hashPassword = await this.authService.hashPassword(
            createUserDto.password,
        );
        createUserDto.password = hashPassword;

        // get role
        let userRole = await this.roleRepository.getRoleByName(
            RoleNameConstants.USER,
        );

        return await this.userRepository.createUser(
            createUserDto,
            userRole._id.toString(),
        );
    }
}
