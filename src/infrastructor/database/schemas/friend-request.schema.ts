/** @format */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type FriendRequestDocument = HydratedDocument<FriendRequest>;

@Schema({ timestamps: true })
export class FriendRequest {
    @Prop({ required: true, type: Types.ObjectId, ref: "User" })
    sender_id: Types.ObjectId;

    @Prop({ required: true, type: Types.ObjectId, ref: "User" })
    receiver_id: Types.ObjectId;

    @Prop({ required: true })
    request_message: string;

    @Prop({
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "canceled"],
    })
    status: string;

    @Prop()
    response_time: number;
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);
