/** @format */

import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Post,
    Res,
} from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { SignUpUseCase } from "src/application/usecases/UserUsecases/index";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { HttpStatusCodeConstants } from "src/common/constants";
import { UserEntity } from "src/domain/entities/user.entity";
import { PasswordUtils } from "src/common/utils/password.utils";
import { SignInDto } from "../dtos/sign-in.dto";
import { ResponseJsonUtils } from "src/common/utils/response-json.utils";
import { SignInUseCase } from "src/application/usecases/UserUsecases/sign-in.usecase";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly signInUseCase: SignInUseCase,
    ) {}

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

        return ResponseJsonUtils(
            HttpStatusCodeConstants.CREATED,
            "Create user successfully",
            {
                data: newUser,
            },
        );
    }

    @Post("signin")
    @HttpCode(HttpStatusCodeConstants.OK)
    @ApiOperation({ summary: "Sign in" })
    @ApiBody({ type: SignInDto })
    @ApiResponse({
        status: HttpStatusCodeConstants.OK,
        description: "Sign in successfully",
    })
    @ApiResponse({
        status: HttpStatusCodeConstants.BAD_REQUEST,
        description: "Bad Request",
    })
    @ApiResponse({
        status: HttpStatusCodeConstants.NOT_FOUND,
        description: "User not found",
    })
    @ApiResponse({
        status: HttpStatusCodeConstants.UNAUTHORIZED,
        description: "Unauthorized",
    })
    async signIn(@Body() singInDto: SignInDto) {
        const tokens = await this.signInUseCase.execute(singInDto);

        return ResponseJsonUtils(
            HttpStatusCodeConstants.OK,
            "Sign in successfully",
            tokens,
        );
    }
}
