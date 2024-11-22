/** @format */

import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateSettingUserDto {
    @IsString()
    @ApiProperty({
        description: "The name of the setting",
        example: "setting_name",
    })
    setting_name: string;

    @IsString()
    @ApiProperty({
        description: "The value of the setting",
        example: "setting_value",
    })
    setting_value: string;
}
