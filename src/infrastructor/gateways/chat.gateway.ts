/** @format */

import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    @SubscribeMessage("chat")
    handleMessage(
        @MessageBody() data: string,
        @ConnectedSocket() client: Socket,
    ): void {
        // client.join("chat_id");
        // if (client.rooms.has("chat_id")) {
        //     console.log("User is in chat_id room");
        //     client.leave("chat_id");
        // }
        // this.server.to("chat_id").emit("chat", data);
        this.server.emit("chat", data);
    }
}
