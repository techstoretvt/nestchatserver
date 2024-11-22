/** @format */

import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/domain/interfaces/repositories";
import { UpdateSettingUserDto } from "src/presentation/dtos/update-setting-user.dto";

@Injectable()
export class AddDefaultSettingUseCase {
    constructor(
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
    ) {}
    async execute(updateSettingUserDto: UpdateSettingUserDto) {
        return await this.userRepository.addDefaultSettingAllUser(
            updateSettingUserDto,
        );
    }
}
