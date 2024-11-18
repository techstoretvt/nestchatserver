/** @format */
import { Exclude, Expose, Type } from "class-transformer";

class Auth {
    @Expose()
    provider: string;

    @Expose()
    provider_id: string;
}

class Setting {
    @Expose()
    name: string;

    @Expose()
    value: string;
}

class Friend {
    @Expose()
    friend_id: string;

    @Expose()
    nickname: string;

    @Expose()
    is_blocked: boolean;

    @Expose()
    is_friend: boolean;
}

export class UserEntity {
    constructor(
        _id?: string,
        full_name?: string,
        email?: string,
        username?: string,
        avatar?: string,
        auth?: Auth,
        role?: string,
        hash_password?: string,
        last_login?: number,
        is_online?: boolean,
        last_seen?: number,
        settings?: Setting[],
        friends?: Friend[],
    ) {
        this._id = _id;
        this.full_name = full_name;
        this.email = email;
        this.username = username;
        this.avatar = avatar;
        this.auth = auth;
        this.role = role;
        this.hash_password = hash_password;
        this.last_login = last_login;
        this.is_online = is_online;
        this.last_seen = last_seen;
        this.settings = settings;
        this.friends = friends;
    }

    @Expose()
    _id: string;

    @Expose()
    full_name: string;

    @Expose()
    email: string;

    @Expose()
    username: string;

    @Expose()
    avatar: string;

    @Expose()
    @Type(() => Auth)
    auth: Auth;

    @Expose()
    role: string;

    @Expose()
    hash_password: string;

    @Expose()
    last_login: number;

    @Expose()
    is_online: boolean;

    @Expose()
    last_seen: number;

    @Expose()
    @Type(() => Setting)
    settings: Setting[];

    @Expose()
    @Type(() => Friend)
    friends: Friend[];
}
