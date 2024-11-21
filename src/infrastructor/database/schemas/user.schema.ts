/** @format */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    full_name: string;

    @Prop()
    username: string;

    @Prop({ sparse: true, default: null })
    email: string;

    @Prop({ required: true })
    avatar: string;

    @Prop()
    hash_password: string;

    @Prop({
        type: {
            provider: {
                type: String,
                enum: ["local", "facebook", "google"],
                required: true,
            },
            provider_id: { type: String },
        },
    })
    auth: {
        provider: string;
        provider_id: string;
    };

    @Prop()
    last_login: number;

    @Prop({ default: false })
    is_online: boolean;

    @Prop()
    last_seen: number;

    @Prop({ required: true })
    role: Types.ObjectId;

    @Prop([
        {
            name: { type: String, required: true },
            value: { type: String, required: true },
        },
    ])
    settings: {
        name: string;
        value: string;
    }[];

    @Prop([
        {
            friend_id: { type: Types.ObjectId, ref: "User", required: true },
            nickname: { type: String },
            is_blocked: { type: Boolean, default: false },
            is_friend: { type: Boolean, default: true },
        },
    ])
    friends: {
        friend_id: Types.ObjectId;
        nickname: string;
        is_blocked: boolean;
        is_friend: boolean;
    }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
