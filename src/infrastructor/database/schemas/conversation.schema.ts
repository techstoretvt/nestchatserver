/** @format */

import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({ timestamps: true })
export class Conversation {
    @Prop()
    group_name: string;

    @Prop({ default: false })
    is_group: boolean;

    @Prop({ default: 0 })
    last_message_at: number;

    @Prop()
    background_image: string;

    @Prop({ default: "active", enum: ["active", "deleted", "suspended"] })
    status: string;

    @Prop([
        {
            user_id: { type: Types.ObjectId, ref: "User", required: true },
            joined_at: { type: Number, required: true },
            role: {
                type: String,
                enum: ["member", "admin", "moderator"],
                default: "member",
            },
            can_send_message: { type: Boolean, default: true },
            is_pinned: { type: Boolean, default: false },
            is_hidden: { type: Boolean, default: false },
            pinned_at: Number,
        },
    ])
    participants: {
        user_id: Types.ObjectId;
        joined_at: number;
        role: string;
        can_send_message: boolean;
        is_pinned: boolean;
        is_hidden: boolean;
        pinned_at: number;
    }[];

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
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
