/** @format */

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { HttpExceptionFilter } from "./common/filters/http_exception.filter";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.useGlobalFilters(new HttpExceptionFilter());
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
