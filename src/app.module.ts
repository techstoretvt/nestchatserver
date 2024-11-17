/** @format */

import { Module } from "@nestjs/common";
import { UserModule } from "./presentation/modules/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AuditLogInterceptor } from "./middleware/interceptors/index";
import { AuditLogService } from "./infrastructor/services/index";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ThrottlerConstants } from "./common/constants/index";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseConfig } from "./configs/database.config";
import { ChatModule } from "./presentation/modules/chat.module";
import { AuthModule } from "./presentation/modules/auth.module";

const AppModules = [UserModule, ChatModule, AuthModule];

const OtherModules = [
    ConfigModule.forRoot({
        isGlobal: true,
    }),
    MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            uri: DatabaseConfig.getMongoUri(configService),
        }),
        inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
        {
            ttl: ThrottlerConstants.GLOBAL_REQUEST_TTL,
            limit: ThrottlerConstants.GLOBAL_REQUEST_LIMIT,
        },
    ]),
];

@Module({
    imports: [...OtherModules, ...AppModules],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: AuditLogInterceptor, // Đăng ký interceptor toàn cục
        },
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard, // Đăng ký Rate Limits với Throttler
        },

        AuditLogService,
    ],
})
export class AppModule {}
