/** @format */

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { HttpExceptionFilter } from "./common/filters/http_exception.filter";
import { setupSwagger } from "./configs/swagger.config";
import { ValidationPipe } from "@nestjs/common";
import { join } from "path";
import cookieParser from "cookie-parser";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(join(__dirname, "..", "public"), {
        prefix: "/public/",
    });

    // cookie
    app.use(cookieParser());

    // guard

    // pipe
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            disableErrorMessages: false,
            whitelist: true,
        }),
    );

    // Interceptor
    app.useGlobalFilters(new HttpExceptionFilter());

    // Global prefix
    app.setGlobalPrefix("api");

    // Cấu hình Swagger api
    setupSwagger(app);

    await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
