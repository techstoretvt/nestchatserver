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
import { CreateUserUseCase } from "../../domain/usecases/UserUsecases/create-user.usecase";
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
            let data = this.createUserUseCase.execute(body.name, body.email);
            return data;
        } catch (error) {
            // Handle and log the error, then return a friendly message
            console.log("vao catch");

            console.error(error); // Log lỗi ra console

            // Trả về lỗi thông qua HttpException
            throw new HttpException(
                "Something went wrong!",
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
