/** @format */

import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SendRequestDto {
    @IsString()
    @ApiProperty({
        description: "Receiver id",
        example: "receiver_id",
    })
    receiver_id: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: "Request message",
        example: "Hello, can we be friends?",
    })
    request_message: string;
}
