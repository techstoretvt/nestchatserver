/** @format */

import { Body, Controller, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { SendRequestUseCase } from "src/application/usecases/FriendRequest/send-request.usecase";
import { SendRequestDto } from "../dtos/send-request.dto";
import { SendRequestDecorator } from "src/application/decorators/friend-request.decorator";
import { FriendRequestEntity } from "src/domain/entities/friend-request.entity";
import { ResponseJsonUtils } from "src/common/utils/response-json.utils";

@Controller("friend-request")
export class FriendRequestController {
    constructor(private readonly sendRequestUseCase: SendRequestUseCase) {}

    @Post()
    @SendRequestDecorator()
    async sendRequest(@Body() sendRequestDto: SendRequestDto, @Req() req) {
        const user_id = req.user.id;
        let friendRequest: FriendRequestEntity =
            await this.sendRequestUseCase.execute(user_id, sendRequestDto);

        return ResponseJsonUtils(
            HttpStatus.CREATED,
            "Send friend request successfully",
            friendRequest,
        );
    }
}
