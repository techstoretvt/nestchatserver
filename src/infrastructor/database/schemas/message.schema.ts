/** @format */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types, Schema as MongooseSchema } from "mongoose";

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
    @Prop({ type: Types.ObjectId, ref: "Conversation", required: true })
    conversation_id: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "User" })
    sender_id: Types.ObjectId;

    @Prop({
        type: {
            type: {
                type: String,
                // enum: ["text", "media", "contact_card", "notify", "share"],
                required: true,
            },
            data: {
                type: Map,
                of: MongooseSchema.Types.Mixed,
                required: true,
            },
        },
        required: true,
    })
    content: {
        type: string; // "text" | "media" | "contact_card" | "notify" | "share"
        data: Record<string, any>; // Thông tin chi tiết của tin nhắn
    };

    @Prop({ default: false })
    is_pinned: boolean;

    @Prop([
        {
            user_id: { type: Types.ObjectId, ref: "User", required: true },
            icon_type: { type: String, required: true },
            icon_count: { type: Number, default: 0 },
        },
    ])
    reactions: {
        user_id: Types.ObjectId;
        icon_type: string; // Biểu tượng cảm xúc (ví dụ: "like", "heart")
        icon_count: number;
    }[];

    @Prop([
        {
            user_id: { type: Types.ObjectId, ref: "User", required: true },
            status: { type: String, required: true },
            change_at: { type: Number, required: true },
        },
    ])
    status: {
        user_id: Types.ObjectId;
        status: string;
        change_at: number;
    }[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
