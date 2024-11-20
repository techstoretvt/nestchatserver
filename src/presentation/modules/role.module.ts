/** @format */

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {
    Permission,
    PermissionSchema,
} from "src/infrastructor/database/schemas/permission.schema";
import {
    Role,
    RoleSchema,
} from "src/infrastructor/database/schemas/role.schema";
import { RoleResitoryImpl } from "src/infrastructor/repositories/role.repository.impl";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Role.name, schema: RoleSchema },
            {
                name: Permission.name,
                schema: PermissionSchema,
            },
        ]),
    ],
    controllers: [],
    providers: [
        {
            provide: "IRoleRepository",
            useClass: RoleResitoryImpl,
        },
    ],
    exports: ["IRoleRepository"],
})
export class RoleModule {}
