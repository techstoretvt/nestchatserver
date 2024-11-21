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
    UnauthorizedException,
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
import { RefreshTokenUseCase } from "src/application/usecases/UserUsecases/refresh-token.usecase";
import { TokenEntity } from "src/domain/entities/token.entity";
import { AuthGuard } from "src/middleware/guards/auth.guard";
import { LogoutUsecase } from "src/application/usecases/UserUsecases/logout.usecase";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly signInUseCase: SignInUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
        private readonly logoutUseCase: LogoutUsecase,
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

        const tokens: TokenEntity = await this.signInUseCase.execute(
            singInDto,
            client_id,
        );

        if (appType === "Mobile") {
            return res.json(
                ResponseJsonUtils(HttpStatus.OK, "Sign in successfully", {
                    accessToken: tokens.accessToken,
                    refreshToken: tokens.refreshToken,
                }),
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

    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Refresh Token" })
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
        status: HttpStatus.UNAUTHORIZED,
        description: "Invalid or missing refresh token.",
    })
    @ApiResponse({
        status: HttpStatus.FORBIDDEN,
        description: "You do not have permission to refresh the token.",
    })
    async refresh(@Req() req: Request, @Res() res: Response) {
        const cookies = req.cookies;
        const client_id = req.headers["x-client-id"].toString();
        const appType = req.headers["x-app-type"];

        if (!cookies) {
            throw new UnauthorizedException(
                "Invalid or missing refresh token.",
            );
        }
        const refreshToken = cookies.refreshToken;

        let tokenEntity: TokenEntity = await this.refreshTokenUseCase.execute(
            refreshToken,
            client_id,
        );

        if (appType === "Mobile") {
            return res.json(
                ResponseJsonUtils(HttpStatus.OK, "Sign in successfully", {
                    accessToken: tokenEntity.accessToken,
                    refreshToken: tokenEntity.refreshToken,
                }),
            );
        }

        // save token cookie
        res.cookie("refreshToken", tokenEntity.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.json(
            ResponseJsonUtils(HttpStatus.OK, "Refresh token successfully", {
                accessToken: tokenEntity.accessToken,
            }),
        );
    }

    @Post("logout")
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: "Logout" })
    @ApiHeader({
        name: "x-client-id",
        required: true,
        description: "The client id",
        example: "client_id",
    })
    @ApiResponse({
        status: HttpStatus.OK,
        description: "Logout successfully",
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: "Unauthorized",
    })
    async logout(@Req() req: any, @Res() res: Response) {
        const client_id = req.headers["x-client-id"].toString();
        const user_id = req.user_id;

        await this.logoutUseCase.execute(user_id, client_id);

        res.clearCookie("refreshToken");

        return res.json(
            ResponseJsonUtils(HttpStatus.OK, "Logout successfully"),
        );
    }
}
