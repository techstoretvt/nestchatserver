/** @format */

import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../core/repositories/user.repository";
import { User } from "../../core/entities/user.entity";
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
			firstName: "first name",
			lastName: "last name",
			email: "email address",
		});

		let newUser = new User(row.id, "", "");

		db.Users.findAll({
			where: { id: row.id, [Op.not]: [null] },
			attributes: ["id"],
		});

		let str =
			"ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ahfhd ";

		return newUser;
	}

	async findById(id: string): Promise<User> {
		return this.users.find((user) => user.id === id);
	}
}