/** @format */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
    @Prop({ required: true, unique: true })
    role_name: string;

    @Prop({ required: true })
    role_description: string;

    @Prop([
        {
            permission_id: {
                type: Types.ObjectId,
                ref: "Permission",
                required: true,
            },
        },
    ])
    permissions: {
        permission_id: Types.ObjectId;
    }[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
