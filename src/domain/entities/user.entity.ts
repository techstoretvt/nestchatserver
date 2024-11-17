/** @format */
import { Exclude, Expose, Type } from "class-transformer";

class Auth {
    @Expose()
    provider: string;

    @Expose()
    provider_id: string;
}

export class UserEntity {
    @Expose()
    id: string;

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

    @Exclude()
    hash_password: string;
}
