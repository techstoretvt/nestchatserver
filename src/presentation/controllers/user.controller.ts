/** @format */

import {
	Controller,
	Post,
	Body,
	HttpException,
	HttpStatus,
	UseInterceptors,
	Get,
} from "@nestjs/common";
import { CreateUserUseCase } from "../../core/usecases/UserUsecases/create-user.usecase";
import { LoggingInterceptor } from "../../middleware/interceptors/logging.interceptor";

@Controller("users")
@UseInterceptors(LoggingInterceptor)
export class UserController {
	constructor(private readonly createUserUseCase: CreateUserUseCase) {}

	@Get()
	async getUser() {
		return {
			message: "OK",
		};
	}

	@Post()
	async createUser(@Body() body: { name: string; email: string }) {
		try {
			return this.createUserUseCase.execute(body.name, body.email);
		} catch (error) {
			// Handle and log the error, then return a friendly message
			throw new HttpException(
				"Unable to retrieve user",
				HttpStatus.BAD_REQUEST,
			);
		}
	}
}
