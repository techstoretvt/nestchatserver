/** @format */

import { Module } from "@nestjs/common";
import { ChatGateway } from "src/infrastructor/gateways/chat.gateway";

@Module({
    providers: [ChatGateway],
})
export class ChatModule {}
