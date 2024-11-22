/** @format */

import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Req,
    Res,
    UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../dtos/create-user.dto";
import { SignUpUseCase } from "src/application/usecases/UserUsecases/index";
import { UserEntity } from "src/domain/entities/user.entity";
import { SignInDto } from "../dtos/sign-in.dto";
import { ResponseJsonUtils } from "src/common/utils/response-json.utils";
import { SignInUseCase } from "src/application/usecases/UserUsecases/sign-in.usecase";
import { Response, Request } from "express";
import { RefreshTokenUseCase } from "src/application/usecases/UserUsecases/refresh-token.usecase";
import { TokenEntity } from "src/domain/entities/token.entity";
import { LogoutUsecase } from "src/application/usecases/UserUsecases/logout.usecase";
import {
    LogoutDecorator,
    RefreshTokenDecorator,
    SignInDecorator,
    SignUpDecorator,
} from "src/application/decorators/auth.decorator";
import { ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
    constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly signInUseCase: SignInUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
        private readonly logoutUseCase: LogoutUsecase,
    ) {}

    @Post("signup")
    @SignUpDecorator()
    async signUp(@Body() createUserDto: CreateUserDto) {
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
    @SignInDecorator()
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
    @RefreshTokenDecorator()
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
    @LogoutDecorator()
    async logout(@Req() req: any, @Res() res: Response) {
        const client_id = req.headers["x-client-id"].toString();
        const user_id = req.user.id;

        await this.logoutUseCase.execute(user_id, client_id);

        res.clearCookie("refreshToken");

        return res.json(
            ResponseJsonUtils(HttpStatus.OK, "Logout successfully"),
        );
    }
}
