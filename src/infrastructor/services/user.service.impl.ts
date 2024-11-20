/** @format */

import { Injectable } from "@nestjs/common";
import { IUserService } from "src/domain/interfaces/services/user.service.interface";

@Injectable()
export class UserServiceImpl implements IUserService {
    constructor() {}
}
