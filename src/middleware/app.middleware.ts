/** @format */

// app.middleware.ts
import {
    Injectable,
    NestMiddleware,
    HttpException,
    HttpStatus,
    BadRequestException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class AppTypeMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const appType = req.headers["x-app-type"];

        if (!appType) {
            throw new BadRequestException("X-App-Type header is missing");
        }

        if (!["Web", "Mobile", "Desktop"].includes(appType.toString())) {
            throw new BadRequestException("Invalid X-App-Type value");
        }

        next();
    }
}
