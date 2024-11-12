/** @format */

// src/infrastructure/database/repositories/user.repository.impl.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { UserRepositoryImpl } from "./user.repository.impl";
import { User } from "../../core/entities/user.entity";

describe("UserRepositoryImpl", () => {
	let repository: UserRepositoryImpl;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserRepositoryImpl],
		}).compile();

		repository = module.get<UserRepositoryImpl>(UserRepositoryImpl);
	});

	it("should create and find user", async () => {
		const user: User = { id: "1", name: "New User", email: "Email Test" };
		await repository.create(user);

		const foundUser = await repository.findById("1");
		expect(foundUser).toEqual(user);
	});
});
