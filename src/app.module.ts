/** @format */

import { Module } from "@nestjs/common";
// import { UserModule } from './user/user.module';
import { UserModule } from "./presentation/modules/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./infrastructor/database/schemas/user.schema";

@Module({
    imports: [
        UserModule,
        MongooseModule.forRoot("mongodb://localhost/quychat"),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
