/** @format */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type NotifycationDocument = HydratedDocument<Notifycation>;

export enum NotificationType {
    MESSAGE = "message", // Tin nhắn mới
    FRIEND_REQUEST = "friend_request", // Yêu cầu kết bạn
    USER_ONLINE = "user_online", // Người dùng trực tuyến
    USER_OFFLINE = "user_offline", // Người dùng ngoại tuyến
    SYSTEM = "system", // Thông báo hệ thống
}

@Schema({ timestamps: true })
export class Notifycation {
    @Prop({ type: Types.ObjectId, ref: "User" })
    user_id: Types.ObjectId; // Người nhận thông báo

    @Prop({ enum: NotificationType, required: true })
    type: NotificationType; // Loại thông báo (message, friend_request, ...)

    @Prop({ type: Types.ObjectId, ref: "Message", required: false })
    related_message: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "User", required: false })
    related_user: Types.ObjectId;

    @Prop({ type: String, required: true })
    content: string; // Nội dung thông báo

    @Prop({ type: Boolean, default: false })
    is_read: boolean; // Trạng thái đã đọc hay chưa

    @Prop([
        {
            user_id: { type: Types.ObjectId, ref: "User", required: true },
            read_at: { type: Number, required: true },
        },
    ])
    user_reads: { user_id: Types.ObjectId; read_at: number }[]; // danh sách user đã đọc nếu là thông báo chung

    @Prop({ type: Number, default: 0 })
    read_at: number; // Thời gian đọc thông báo (null nếu chưa đọc)

    @Prop()
    expired_at: number; // Thời gian hết hạn của thông báo (nếu có)
}

export const NotifycationSchema = SchemaFactory.createForClass(Notifycation);
