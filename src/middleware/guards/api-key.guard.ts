/** @format */

import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class ApiKeyGuard implements CanActivate {
    // Đặt API Key hợp lệ tại đây hoặc từ một biến môi trường
    private readonly validApiKey = process.env.API_KEY;

    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers["api-key"]; // Lấy API key từ header

        const skipApiKeyCheck = this.reflector.get<boolean>(
            "skipApiKey",
            context.getHandler(),
        );

        if (skipApiKeyCheck) {
            return true;
        }

        if (!apiKey) {
            throw new ForbiddenException("API Key is required");
        }

        // Kiểm tra xem API key có hợp lệ hay không
        if (apiKey !== this.validApiKey) {
            throw new ForbiddenException("Invalid API Key");
        }

        return true;
    }
}
