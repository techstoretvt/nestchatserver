/** @format */

import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateFriendDto {
    @IsString()
    friend_id: string;

    @IsString()
    @IsOptional()
    nickname: string;

    @IsBoolean()
    @IsOptional()
    is_blocked: boolean;

    @IsBoolean()
    @IsOptional()
    is_friend: boolean;
}
