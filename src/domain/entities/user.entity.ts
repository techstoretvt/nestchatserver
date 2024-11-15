/** @format */
import { Exclude, Expose } from "class-transformer";

export class UserEntity {
    constructor(
        public _id: string,
        public _name: string,
        public _email: string,
    ) {
        this.id = _id;
        this.name = _name;
        this.email = _email;
    }

    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Exclude()
    password: string;
}
