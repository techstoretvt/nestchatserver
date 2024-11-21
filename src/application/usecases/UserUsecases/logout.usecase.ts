/** @format */

import { Inject, Injectable } from "@nestjs/common";
import { IAuthService } from "src/domain/interfaces/services";

@Injectable()
export class LogoutUsecase {
    constructor(
        @Inject("IAuthService") private readonly authService: IAuthService,
    ) {}

    async execute(user_id: string, client_id: string) {
        // remove token in redis
        await this.authService.removeRefreshToken(user_id, client_id);
    }
}
