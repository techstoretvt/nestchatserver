/** @format */

import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from "@nestjs/common";
import { IUserRepository } from "../../domain/interfaces/repositories/user.repository.interface";
import { UserEntity } from "../../domain/entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../database/schemas/user.schema";
import { Model, Types } from "mongoose";
import { plainToInstance } from "class-transformer";
import { CreateUserDto, UpdateUserDto } from "src/presentation/dtos";
import {
    avatarDefault,
    RoleNameConstants,
    UserProvider,
} from "src/common/constants";
import { FriendEntity } from "src/domain/entities/friend.entity";

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async addFriend(user_id: string, friend_id: string): Promise<FriendEntity> {
        // check user
        const user = await this.userModel.findById(user_id).exec();
        if (!user) {
            throw new NotFoundException(`User not found with id ${user_id}`);
        }

        // check friend exits
        let friend = user.friends.find(
            (friend) => friend.friend_id.toString() === friend_id,
        );

        if (friend) {
            await this.userModel.updateOne(
                { _id: user_id, "friends.friend_id": friend_id },
                {
                    $set: {
                        "friends.$.is_friend": true,
                    },
                },
            );
            const friendEntity: FriendEntity = {
                user_id: user_id,
                friend_id: friend_id,
                nickname: friend.nickname,
                is_blocked: friend.is_blocked,
                is_friend: true,
            };
            return friendEntity;
        }

        // add new friend
        user.friends.push({
            friend_id: new Types.ObjectId(friend_id),
            nickname: null,
            is_blocked: false,
            is_friend: true,
        });

        await user.save();

        const newFriend = user.friends.find(
            (friend) => friend.friend_id.toString() === friend_id,
        );
        const friendEntity: FriendEntity = {
            user_id: user_id,
            friend_id: newFriend.friend_id.toString(),
            nickname: newFriend.nickname,
            is_blocked: newFriend.is_blocked,
            is_friend: newFriend.is_friend,
        };
        return friendEntity;
    }

    async updateUser(
        updateUserDto: UpdateUserDto,
        user_id: string,
    ): Promise<UserEntity> {
        const updatedUser = await this.userModel.findByIdAndUpdate(
            user_id,
            { $set: updateUserDto },
            { new: true },
        );

        let userEntity: UserEntity = plainToInstance(UserEntity, updatedUser, {
            excludeExtraneousValues: true,
        });
        userEntity._id = updatedUser._id.toString();
        return userEntity;
    }

    async seedUser(data: any): Promise<void> {
        let newAdmin = new this.userModel({
            full_name: data.full_name,
            hash_password: data.hash_password,
            username: data.username,
            avatar: avatarDefault,
            auth: {
                provider: RoleNameConstants.USER,
            },
            role: data.role_id,
        });
        await newAdmin.save();
    }

    createSuperAdmin(): Promise<void> {
        console.log("createSuperAdmin...");

        throw new Error("Method not implemented.");
    }

    async getUserById(user_id: string): Promise<UserEntity> {
        let user = await this.userModel.findOne({ _id: user_id }).exec();

        let userEntity = plainToInstance(UserEntity, user, {
            excludeExtraneousValues: true,
        });
        userEntity._id = user._id.toString();
        return userEntity;
    }

    async getUserByUsername(username: string): Promise<UserEntity> {
        try {
            const user = await this.userModel
                .findOne({ username: username })
                .exec();
            if (!user) {
                return null;
            }

            let userEntity: UserEntity = plainToInstance(UserEntity, user, {
                excludeExtraneousValues: true,
            });
            userEntity._id = user._id.toString();
            userEntity.hash_password = user.hash_password;

            return userEntity;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createUser(
        user: CreateUserDto,
        role_id: string,
    ): Promise<UserEntity> {
        try {
            let { username, password } = user;

            const createdUser = new this.userModel({
                full_name: username,
                hash_password: password,
                username: username,
                avatar: avatarDefault,
                auth: {
                    provider: UserProvider.LOCAL,
                },
                role: role_id,
            });
            await createdUser.save();
            let newUser = plainToInstance(UserEntity, createdUser, {
                excludeExtraneousValues: true,
            });
            return newUser;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
