/** @format */

import { IsString } from "class-validator";

export class UpdateSettingUserDto {
    @IsString()
    setting_name: string;

    @IsString()
    setting_value: string;
}
