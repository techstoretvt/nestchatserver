/** @format */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PermissionDocument = HydratedDocument<Permission>;

@Schema({ timestamps: true })
export class Permission {
    @Prop({ required: true, unique: true })
    permission_name: string;

    @Prop({ required: true })
    permission_description: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
