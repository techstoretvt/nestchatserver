/** @format */

import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerConstants } from "../common/constants/index";

export const setupSwagger = (app: INestApplication<any>) => {
    const config = new DocumentBuilder()
        .setTitle(SwaggerConstants.SWAGGER_TITLE)
        .setDescription(SwaggerConstants.SWAGGER_DESCRIPTION)
        .setVersion(SwaggerConstants.SWAGGER_VERSION)
        .addBearerAuth() // Nếu có dùng JWT Authentication
        .build();

    const document = SwaggerModule.createDocument(app, config);

    // Endpoint hiển thị giao diện Swagger
    SwaggerModule.setup("api", app, document);
};
