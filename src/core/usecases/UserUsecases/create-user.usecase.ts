/** @format */

import { Inject, Injectable } from "@nestjs/common";
import { User } from "../../entities/user.entity";
import { UserRepository } from "src/core/repositories/user.repository";

@Injectable()
export class CreateUserUseCase {
	constructor(
		@Inject("UserRepository")
		private readonly userRepository: UserRepository,
	) {}

	async execute(name: string, email: string): Promise<User> {
		const user = new User(Date.now().toString(), name, email);
		return await this.userRepository.create(user);
	}
}
