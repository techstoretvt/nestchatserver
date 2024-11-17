/** @format */

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IUserRepository } from "../../domain/interfaces/repositories/user.repository.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../database/schemas/user.schema";
import { Model } from "mongoose";
import { plainToInstance } from "class-transformer";
import { CreateUserDto } from "src/presentation/dtos/create_user.dto";
import { ProviderUsers, UserRoles } from "src/common/constants";
import { PasswordUtils } from "src/common/utils/password.utils";

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getUserByUsername(username: string): Promise<UserEntity> {
        try {
            const user = await this.userModel
                .findOne({ username: username })
                .exec();
            let userEntity = plainToInstance(UserEntity, user, {
                excludeExtraneousValues: true,
            });
            return userEntity;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createUser(user: CreateUserDto): Promise<UserEntity> {
        try {
            let { username, password } = user;
            password = await PasswordUtils.hashPassword(password);

            const createdUser = new this.userModel({
                full_name: username,
                hash_password: password,
                username: username,
                avatar: "avatar",
                auth: {
                    provider: ProviderUsers.LOCAL,
                },
                role: UserRoles.USER,
            });
            await createdUser.save();
            let newUser = plainToInstance(UserEntity, createdUser, {
                excludeExtraneousValues: true,
            });
            return newUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
