/** @format */

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { HttpExceptionFilter } from "./common/filters/http_exception.filter";
import { setupSwagger } from "./configs/swagger.config";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Interceptor
    app.useGlobalFilters(new HttpExceptionFilter());

    // Cấu hình Swagger api
    setupSwagger(app);

    // Global prefix
    app.setGlobalPrefix("api");

    await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
