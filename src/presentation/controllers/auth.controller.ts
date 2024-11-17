/** @format */

import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CreateUserDto } from "../dtos/create_user.dto";
import { SignUpUseCase } from "src/application/usecases/UserUsecases/index";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { HttpStatusCodeConstants } from "src/common/constants";
import { UserEntity } from "src/domain/entities/user.entity";

@Controller("auth")
export class AuthController {
    constructor(private readonly signUpUseCase: SignUpUseCase) {}

    @Post("signup")
    @HttpCode(HttpStatusCodeConstants.CREATED)
    @ApiOperation({ summary: "Sign up" })
    @ApiResponse({
        status: HttpStatusCodeConstants.CREATED,
        description: "The list of users",
    })
    async signUp(@Body() createUserDto: CreateUserDto) {
        let newUser: UserEntity =
            await this.signUpUseCase.execute(createUserDto);
        return {
            statusCode: HttpStatusCodeConstants.CREATED,
            message: "Create user successfully",
            data: newUser,
        };
    }
}
