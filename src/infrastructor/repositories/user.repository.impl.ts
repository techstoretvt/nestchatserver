/** @format */

import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/interfaces/repositories/user.repository";
import { UserEntity } from "../../domain/entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../database/schemas/user.schema";
import { Model } from "mongoose";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    private users: UserEntity[] = [];

    async save(user: UserEntity): Promise<UserEntity> {
        this.users.push(user);
        return user;
    }

    async create(user: UserEntity): Promise<UserEntity> {
        let newUser = plainToInstance(
            UserEntity,
            { id: user.id, name: "row.full_name", email: "row.email" },
            {
                excludeExtraneousValues: true,
            },
        );

        const createdUser = new this.userModel({
            name: "name",
            email: "email",
        });
        createdUser.save();

        return newUser;
    }

    async findById(id: string): Promise<UserEntity> {
        return this.users.find((user) => user.id === id);
    }
}
