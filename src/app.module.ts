/** @format */

import { Module } from "@nestjs/common";
import { UserModule } from "./presentation/modules/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { AuditLogInterceptor } from "./middleware/interceptors/index";
import { AuditLogService } from "./infrastructor/services/index";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ThrottlerConstants } from "./common/constants/index";

@Module({
    imports: [
        UserModule,
        MongooseModule.forRoot("mongodb://localhost/quychat"),
        ThrottlerModule.forRoot([
            {
                ttl: ThrottlerConstants.GLOBAL_REQUEST_TTL,
                limit: ThrottlerConstants.GLOBAL_REQUEST_LIMIT,
            },
        ]),
    ],
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
