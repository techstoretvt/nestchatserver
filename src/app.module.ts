/** @format */

import { Module } from "@nestjs/common";
// import { UserModule } from './user/user.module';
import { UserModule } from "./presentation/modules/user.module";

@Module({
    imports: [UserModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
