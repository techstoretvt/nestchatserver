/** @format */

import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class ClientIdGuard implements CanActivate {
    // Đặt API Key hợp lệ tại đây hoặc từ một biến môi trường

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const clientId = request.headers["x-client-id"]; // Lấy API key từ header

        if (!clientId) {
            throw new ForbiddenException("Client ID is required");
        }

        return true;
    }
}
