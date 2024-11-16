/** @format */

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
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
            full_name: "full_name",
            // username: "username2",
            // email: "email2",
            avatar: "avatar",
            auth: {
                provider: "local",
            },
            role: "user",
        });
        try {
            createdUser.save();
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return newUser;
    }

    async findById(id: string): Promise<UserEntity> {
        return this.users.find((user) => user.id === id);
    }
}
