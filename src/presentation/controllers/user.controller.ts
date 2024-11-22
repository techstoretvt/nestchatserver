/** @format */

import {
    Controller,
    Body,
    HttpStatus,
    Get,
    Inject,
    Param,
    Patch,
    Request,
    Res,
} from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from "cache-manager";
import { ApiTags } from "@nestjs/swagger";
import { TestUsecase } from "src/application/usecases/UserUsecases";
import { UpdateUserDto } from "../dtos";
import { ResponseJsonUtils } from "src/common/utils/response-json.utils";
import { UpdateUserUsecase } from "src/application/usecases/UserUsecases/update-user.usecase";
import { UpdateSettingUserDto } from "../dtos/update-setting-user.dto";
import { AddDefaultSettingUseCase } from "src/application/usecases/UserUsecases/add-default-setting.usecase";
import {
    GetAllUserDecorator,
    UpdateSettingDecorator,
    UpdateUserDecorator,
} from "src/application/decorators/user.decorator";

@Controller("users")
@ApiTags("Users")
export class UserController {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly testUseCase: TestUsecase,
        private readonly updateUserUseCase: UpdateUserUsecase,
        private readonly addDefaultSettingUserUseCase: AddDefaultSettingUseCase,
    ) {}

    @Get()
    @GetAllUserDecorator()
    async getUser() {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return {
            message: "OK",
        };
    }

    @Patch("/update/me")
    @UpdateUserDecorator()
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req) {
        let data = await this.updateUserUseCase.execute(
            updateUserDto,
            req.user.id,
        );
        return ResponseJsonUtils(HttpStatus.OK, "OK", data);
    }

    @Patch("/settings")
    @UpdateSettingDecorator()
    async addDefaultSettingUser(
        @Body() updateSettingUserDto: UpdateSettingUserDto,
        @Res() res: any,
    ) {
        const data =
            await this.addDefaultSettingUserUseCase.execute(
                updateSettingUserDto,
            );

        const message = data
            ? "Add default setting successfully"
            : "No changes made";
        return res
            .status(HttpStatus.OK)
            .json(ResponseJsonUtils(HttpStatus.OK, message, data));
    }

    @Patch("/test/:id")
    async test(@Body("") body: any, @Param("id") id: string) {
        let data = await this.testUseCase.execute(id, body.friend_id);

        return {
            message: "oke",
            data,
        };
    }
}
