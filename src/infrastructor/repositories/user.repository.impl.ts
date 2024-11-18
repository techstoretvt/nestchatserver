/** @format */

import { Injectable, NotFoundException } from "@nestjs/common";
import { IUserRepository } from "../../domain/interfaces/repositories/user.repository.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../database/schemas/user.schema";
import { Model } from "mongoose";
import { plainToInstance } from "class-transformer";
import { CreateUserDto } from "src/presentation/dtos/create-user.dto";
import { avatarDefault, ProviderUsers, UserRoles } from "src/common/constants";

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getUserById(user_id: string): Promise<UserEntity> {
        let user = await this.userModel.findOne({ _id: user_id }).exec();

        let userEntity = plainToInstance(UserEntity, user, {
            excludeExtraneousValues: true,
        });
        userEntity._id = user._id.toString();
        return userEntity;
    }
    async updateUserLastLogin(user_id: string): Promise<void> {
        let user = await this.userModel.findOne({ _id: user_id }).exec();

        if (!user) {
            throw new NotFoundException("User not found");
        }
        user.last_login = Date.now();
        await user.save();
    }

    async getUserByUsername(username: string): Promise<UserEntity> {
        try {
            const user = await this.userModel
                .findOne({ username: username })
                .exec();

            let userEntity: UserEntity = plainToInstance(UserEntity, user, {
                excludeExtraneousValues: true,
            });
            userEntity._id = user._id.toString();
            return userEntity;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createUser(user: CreateUserDto): Promise<UserEntity> {
        try {
            let { username, password } = user;

            const createdUser = new this.userModel({
                full_name: username,
                hash_password: password,
                username: username,
                avatar: avatarDefault,
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
