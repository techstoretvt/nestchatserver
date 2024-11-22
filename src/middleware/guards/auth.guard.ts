/** @format */

import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    Inject,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { IAuthService } from "src/domain/interfaces/services";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject("IAuthService") private readonly authService: IAuthService,
    ) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers["authorization"]?.split(" ")[1];

        if (!accessToken) {
            throw new UnauthorizedException("No token provided");
        }

        const decodedToken = this.authService.verifyAccessToken(accessToken);

        request.user = {
            id: decodedToken.id,
            role_id: decodedToken.role,
        };

        return true;
    }
}
