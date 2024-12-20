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
    SettingUserDefault,
    UserProvider,
} from "src/common/constants";
import { FriendEntity } from "src/domain/entities/friend.entity";
import { UpdateFriendDto } from "src/presentation/dtos/update-friend.dto";
import { SettingUserEntity } from "src/domain/entities/setting-user.entity";
import { UpdateSettingUserDto } from "src/presentation/dtos/update-setting-user.dto";

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getListBlockedFriend(user_id: string): Promise<FriendEntity[]> {
        const user = await this.userModel
            .findOne(
                { _id: user_id, "friends.is_friend": true },
                { friends: 1 },
            )
            .exec();
        if (!user) return null;

        const friendEntity: FriendEntity[] = user.friends.map((item) => ({
            user_id: user_id,
            friend_id: item.friend_id.toString(),
            nickname: item.nickname,
            is_blocked: item.is_blocked,
            is_friend: item.is_friend,
        }));

        return friendEntity;
    }

    async getSettingByUserId(user_id: string): Promise<SettingUserEntity[]> {
        const user = await this.userModel
            .findOne({ _id: user_id }, { settings: 1 })
            .exec();

        if (!user) return null;

        const settingEntity: SettingUserEntity[] = user.settings.map(
            (item) => ({
                setting_name: item.name,
                setting_value: item.value,
            }),
        );

        return settingEntity;
    }
    async getSettingByName(
        user_id: string,
        setting_name: string,
    ): Promise<SettingUserEntity> {
        const setting = await this.userModel
            .findOne(
                { _id: user_id },
                { settings: { $elemMatch: { setting_name: setting_name } } },
            )
            .exec();

        if (!setting) return null;

        const settingEntity: SettingUserEntity = {
            setting_name: setting.settings[0].name,
            setting_value: setting.settings[0].value,
        };

        return settingEntity;
    }

    async getFriendByUserId(user_id: string): Promise<FriendEntity[]> {
        const friends = await this.userModel
            .findOne({ _id: user_id }, { friends: 1 })
            .exec();

        if (!friends) return null;

        const FriendEntity: FriendEntity[] = friends.friends.map((friend) => ({
            user_id: user_id,
            friend_id: friend.friend_id.toString(),
            nickname: friend.nickname,
            is_blocked: friend.is_blocked,
            is_friend: friend.is_friend,
        }));

        return FriendEntity;
    }

    async getFriendByFriendId(
        user_id: string,
        friend_id: string,
    ): Promise<FriendEntity> {
        const friend = await this.userModel
            .findOne(
                { _id: user_id, "friends.friend_id": friend_id },
                { "friends.$": 1 },
            )
            .exec();

        if (!friend) return null;

        const FriendEntity: FriendEntity = {
            user_id: user_id,
            friend_id: friend_id,
            nickname: friend.friends[0].nickname,
            is_blocked: friend.friends[0].is_blocked,
            is_friend: friend.friends[0].is_friend,
        };

        return FriendEntity;
    }

    async addDefaultSettingAllUser(
        updateSettingUserDto: UpdateSettingUserDto,
    ): Promise<SettingUserEntity> {
        let result = await this.userModel.updateMany(
            { "settings.name": { $ne: updateSettingUserDto.setting_name } },
            {
                $addToSet: {
                    settings: {
                        name: updateSettingUserDto.setting_name,
                        value: updateSettingUserDto.setting_value,
                    },
                },
            },
        );
        if (result.modifiedCount === 0) {
            return null;
        }

        const settingEntity: SettingUserEntity = {
            setting_name: updateSettingUserDto.setting_name,
            setting_value: updateSettingUserDto.setting_value,
        };

        return settingEntity;
    }

    async updateSettings(
        user_id: string,
        updateSettingUserDto: UpdateSettingUserDto,
    ): Promise<SettingUserEntity> {
        const settingEntity: SettingUserEntity = {
            setting_name: updateSettingUserDto.setting_name,
            setting_value: updateSettingUserDto.setting_value,
        };

        // check user
        const user = await this.userModel.findById(user_id).exec();
        if (!user) {
            throw new NotFoundException(`User not found with id ${user_id}`);
        }

        // check setting exits
        const setting = user.settings.find(
            (setting) => setting.name === updateSettingUserDto.setting_name,
        );

        if (!setting) {
            // add new setting
            user.settings.push({
                name: updateSettingUserDto.setting_name,
                value: updateSettingUserDto.setting_value,
            });
            await user.save();

            return settingEntity;
        }

        await this.userModel.findOneAndUpdate(
            {
                _id: user_id,
                "settings.name": updateSettingUserDto.setting_name,
            },
            {
                $set: {
                    "settings.$.value": updateSettingUserDto.setting_value,
                },
            },
        );

        return settingEntity;
    }

    async updateFriend(
        user_id: string,
        friend_id: string,
        updateFriendDto: UpdateFriendDto,
    ): Promise<FriendEntity> {
        // check user
        const user = await this.userModel.findById(user_id).exec();
        if (!user) {
            throw new NotFoundException(`User not found with id ${user_id}`);
        }

        // check friend exits
        let friend = user.friends.find(
            (friend) => friend.friend_id.toString() === friend_id,
        );

        if (!friend) {
            throw new NotFoundException(
                `Friend not found with id ${friend_id}`,
            );
        }

        // update friend
        const result = await this.userModel.findOneAndUpdate(
            { _id: user_id, "friends.friend_id": friend_id },
            {
                $set: {
                    "friends.$": updateFriendDto,
                },
            },
            {
                new: true,
            },
        );
        let friendUpdate = result.friends.find(
            (friend) => friend.friend_id.toString() === friend_id,
        );

        const friendEntity: FriendEntity = {
            user_id: user_id,
            friend_id: friend_id,
            nickname: friendUpdate.nickname,
            is_blocked: friendUpdate.is_blocked,
            is_friend: friendUpdate.is_friend,
        };

        return friendEntity;
    }

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
                settings: SettingUserDefault,
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
