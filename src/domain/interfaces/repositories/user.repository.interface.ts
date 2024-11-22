/** @format */

import { CreateUserDto } from "src/presentation/dtos/create-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { UpdateUserDto } from "src/presentation/dtos/update-user.dto";
import { FriendEntity } from "src/domain/entities/friend.entity";
import { UpdateFriendDto } from "src/presentation/dtos/update-friend.dto";
import { UpdateSettingUserDto } from "src/presentation/dtos/update-setting-user.dto";
import { SettingUserEntity } from "src/domain/entities/setting-user.entity";

export interface IUserRepository {
    //#region Get methob
    getUserByUsername(username: string): Promise<UserEntity>;
    getUserById(user_id: string): Promise<UserEntity>;
    addDefaultSettingAllUser(
        updateSettingUserDto: UpdateSettingUserDto,
    ): Promise<SettingUserEntity>;
    getFriendByFriendId(
        user_id: string,
        friend_id: string,
    ): Promise<FriendEntity>;
    getFriendByUserId(user_id: string): Promise<FriendEntity[]>;
    getSettingByName(
        user_id: string,
        setting_name: string,
    ): Promise<SettingUserEntity>;
    getSettingByUserId(user_id: string): Promise<SettingUserEntity[]>;
    getListBlockedFriend(user_id: string): Promise<FriendEntity[]>;

    //#endregion

    //#region Patch methob
    updateUser(
        updateUserDto: UpdateUserDto,
        user_id: string,
    ): Promise<UserEntity>;
    updateFriend(
        user_id: string,
        friend_id: string,
        updateFriendDto: UpdateFriendDto,
    ): Promise<FriendEntity>;
    updateSettings(
        user_id: string,
        updateSettingUserDto: UpdateSettingUserDto,
    ): Promise<SettingUserEntity>;
    //#endregion

    //#region Post methob
    seedUser(data?: any): Promise<void>;
    createUser(user: CreateUserDto, role_id: string): Promise<UserEntity>;
    createSuperAdmin(): Promise<void>;
    addFriend(user_id: string, friend_id: string): Promise<FriendEntity>;
    //#endregion
}
