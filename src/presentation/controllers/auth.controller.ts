/** @format */

import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    SetMetadata,
    UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { SignUpUseCase } from "src/application/usecases/UserUsecases/index";
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { UserEntity } from "src/domain/entities/user.entity";
import { PasswordUtils } from "src/common/utils/password.utils";
import { SignInDto } from "../dtos/sign-in.dto";
import { ResponseJsonUtils } from "src/common/utils/response-json.utils";
import { SignInUseCase } from "src/application/usecases/UserUsecases/sign-in.usecase";
import { Response, Request } from "express";
import { ApiKeyGuard } from "src/middleware/guards/api-key.guard";
import { ClientIdGuard } from "src/middleware/guards/client-id.guard";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly signInUseCase: SignInUseCase,
    ) {}

    @Post("signup")
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: "Sign up" })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: "Create user successfully",
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: "Bad Request",
    })
    @ApiResponse({
        status: HttpStatus.CONFLICT,
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
            HttpStatus.CREATED,
            "Create user successfully",
            {
                data: newUser,
            },
        );
    }

    @Post("signin")
    @UseGuards(ClientIdGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Sign in" })
    @ApiBody({ type: SignInDto })
    @ApiHeader({
        name: "x-app-type",
        required: true,
        description: "The app type (Web, Mobile, Desktop)",
        example: "Web",
    })
    @ApiHeader({
        name: "x-client-id",
        required: true,
        description: "The client id",
        example: "client_id",
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Sign in successfully",
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: "Bad Request",
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: "User not found",
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: "Unauthorized",
    })
    async signIn(
        @Body() singInDto: SignInDto,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const appType = req.headers["x-app-type"];
        const client_id = req.headers["x-client-id"].toString();

        const tokens = await this.signInUseCase.execute(singInDto, client_id);

        if (appType === "Mobile") {
            return res.json(
                ResponseJsonUtils(
                    HttpStatus.OK,
                    "Sign in successfully",
                    tokens,
                ),
            );
        }

        res.cookie("refreshToken", tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.json(
            ResponseJsonUtils(HttpStatus.OK, "Sign in successfully", {
                accessToken: tokens.accessToken,
            }),
        );
    }
}
