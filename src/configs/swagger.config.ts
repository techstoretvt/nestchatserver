/** @format */

import { INestApplication } from "@nestjs/common";
import {
    DocumentBuilder,
    SwaggerDocumentOptions,
    SwaggerModule,
} from "@nestjs/swagger";
import { SwaggerConstants } from "../common/constants/index";

export const setupSwagger = (app: INestApplication<any>) => {
    const config = new DocumentBuilder()
        .setTitle(SwaggerConstants.SWAGGER_TITLE)
        .setDescription(SwaggerConstants.SWAGGER_DESCRIPTION)
        .setVersion(SwaggerConstants.SWAGGER_VERSION)
        .addBearerAuth() // Nếu có dùng JWT Authentication
        .build();

    const options: SwaggerDocumentOptions = {
        ignoreGlobalPrefix: false,
    };

    const documentFactory = () =>
        SwaggerModule.createDocument(app, config, options);

    // Add the global prefix to Swagger
    SwaggerModule.setup("/api", app, documentFactory);
};
