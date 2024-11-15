/** @format */

import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/interfaces/repositories/user.repository";
import { UserEntity } from "../../domain/entities/user.entity";
import db from "../database/models/index";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../database/schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    private users: UserEntity[] = [];

    async save(user: UserEntity): Promise<UserEntity> {
        this.users.push(user);
        return user;
    }

    async create(user: UserEntity): Promise<UserEntity> {
        let row = await db.Users.create({
            id: user.id,
            full_name: "DataTypes.STRING",
            username: "DataTypes.STRING",
            email: "DataTypes.STRING",
            avatar: "DataTypes.TEXT",
            auth_provider: "DataTypes.STRING", // local, facebook,...
            provider_id: "DataTypes.STRING", // allow null
            role: "DataTypes.STRING",
        });

        let newUser = new UserEntity(row.id, row.full_name, row.email);

        // const createdUser = new this.userModel({
        //     name: "name",
        //     email: "email",
        // });
        // createdUser.save();

        // await db.Messages.create({
        //     id: "DataTypes.STRING",
        //     conversation_id: "DataTypes.STRING",
        //     sender_id: "DataTypes.STRING",
        //     message_type: "DataTypes.STRING",
        //     content: "DataTypes.TEXT",
        //     status: "DataTypes.STRING", // sent, recieved, seen
        // });

        return newUser;
    }

    async findById(id: string): Promise<UserEntity> {
        return this.users.find((user) => user.id === id);
    }
}
