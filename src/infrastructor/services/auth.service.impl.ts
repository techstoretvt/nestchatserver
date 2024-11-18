/** @format */

import { UserEntity } from "src/domain/entities/user.entity";
import { CreateUserDto } from "src/presentation/dtos/create-user.dto";
import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from "@nestjs/common";
import { IAuthService } from "src/domain/interfaces/services/auth.service.interface";
import { IUserService } from "src/domain/interfaces/services/user.service.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthServiceImpl implements IAuthService {
    constructor(
        @Inject("IUserService") private readonly userService: IUserService,
    ) {}

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
    }

    async comparePassword(password: string, hashed: string): Promise<boolean> {
        return await bcrypt.compare(password, hashed);
    }
}
