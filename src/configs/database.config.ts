/** @format */

import { ConfigService } from "@nestjs/config";

export class DatabaseConfig {
    static getMongoUri(configService: ConfigService): string {
        const nodeEnv = configService.get<string>("NODE_ENV", "development");

        let host: string;
        let port: string;
        let database: string;
        let username: string | undefined;
        let password: string | undefined;

        // Xử lý chuỗi kết nối theo từng môi trường
        switch (nodeEnv) {
            case "production":
                host = configService.get<string>(
                    "PROD_MONGO_HOST",
                    "localhost",
                );
                port = configService.get<string>("PROD_MONGO_PORT", "27017");
                database = configService.get<string>(
                    "PROD_MONGO_DATABASE",
                    "prod_database",
                );
                username = configService.get<string>("PROD_MONGO_USERNAME");
                password = configService.get<string>("PROD_MONGO_PASSWORD");
                break;

            case "staging":
                host = configService.get<string>(
                    "STAGING_MONGO_HOST",
                    "localhost",
                );
                port = configService.get<string>("STAGING_MONGO_PORT", "27017");
                database = configService.get<string>(
                    "STAGING_MONGO_DATABASE",
                    "staging_database",
                );
                username = configService.get<string>("STAGING_MONGO_USERNAME");
                password = configService.get<string>("STAGING_MONGO_PASSWORD");
                break;

            default: // 'development'
                host = configService.get<string>("DEV_MONGO_HOST", "localhost");
                port = configService.get<string>("DEV_MONGO_PORT", "27017");
                database = configService.get<string>(
                    "DEV_MONGO_DATABASE",
                    "quychat",
                );
                username = configService.get<string>("DEV_MONGO_USERNAME");
                password = configService.get<string>("DEV_MONGO_PASSWORD");
                break;
        }

        let prefix = "mongodb://";
        if (nodeEnv === "production") {
            prefix = "mongodb+srv://";
        }

        // Tạo chuỗi kết nối
        if (username && password) {
            return `${prefix}${username}:${password}@${host}/?retryWrites=true&w=majority&appName=${database}`;
        }

        return `${prefix}${host}:${port}/${database}`;
    }
}
