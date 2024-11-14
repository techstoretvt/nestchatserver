/** @format */

import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user.entity";
import db from "../database/models/index";
import { Op } from "sequelize";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    private users: User[] = [];

    async save(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    async create(user: User): Promise<User> {
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

        let newUser = new User(row.id, row.full_name, row.email);

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

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id);
    }
}
