/** @format */

import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Post,
} from "@nestjs/common";
import { CreateUserDto } from "../dtos/create_user.dto";
import { SignUpUseCase } from "src/application/usecases/UserUsecases/index";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { HttpStatusCodeConstants } from "src/common/constants";
import { UserEntity } from "src/domain/entities/user.entity";
import { validate } from "class-validator";
import { PasswordUtils } from "src/common/utils/password.utils";

@Controller("auth")
export class AuthController {
    constructor(private readonly signUpUseCase: SignUpUseCase) {}

    @Post("signup")
    @HttpCode(HttpStatusCodeConstants.CREATED)
    @ApiOperation({ summary: "Sign up" })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: HttpStatusCodeConstants.CREATED,
        description: "Create user successfully",
    })
    @ApiResponse({
        status: HttpStatusCodeConstants.BAD_REQUEST,
        description: "Bad Request",
    })
    @ApiResponse({
        status: HttpStatusCodeConstants.CONFLICT,
        description: "User already exists",
    })
    async signUp(@Body() createUserDto: CreateUserDto) {
        const checkPassword = PasswordUtils.validatePassword(
            createUserDto.password,
        );
        if (checkPassword?.length > 0) {
            throw new BadRequestException(checkPassword[0].message);
        }

        let newUser: UserEntity =
            await this.signUpUseCase.execute(createUserDto);
        return {
            statusCode: HttpStatusCodeConstants.CREATED,
            message: "Create user successfully",
            data: newUser,
        };
    }
}
