/** @format */

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { HttpExceptionFilter } from "./common/filters/http_exception.filter";
import { setupSwagger } from "./configs/swagger.config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
