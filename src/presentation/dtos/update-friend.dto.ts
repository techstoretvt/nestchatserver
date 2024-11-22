/** @format */

import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateFriendDto {
    @IsString()
    @ApiProperty({
        description: "The username of the user",
        example: "friend_id",
    })
    friend_id: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: "The nickname of the user",
        example: "John Doe",
    })
    nickname: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        description: "The is_blocked of the user",
        example: "true",
    })
    is_blocked: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        description: "The is_friend of the user",
        example: "true",
    })
    is_friend: boolean;
}
