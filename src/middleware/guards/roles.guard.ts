/** @format */

import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Inject,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RoleEntity } from "src/domain/entities/role.entity";
import { IRoleRepository } from "src/domain/interfaces/repositories";

// Inject Reflector để lấy metadata được gán từ Decorators
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject("IRoleRepository")
        private readonly roleRepository: IRoleRepository,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Lấy metadata 'roles' gắn trong route handler, khai báo @Roles('admin') trong mỗi route
        const roles = this.reflector.get<string[]>(
            "roles",
            context.getHandler(),
        );

        if (!roles || roles.length === 0) {
            return true; // Nếu không có metadata roles, cho phép truy cập
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const roleEntity: RoleEntity = await this.roleRepository.getRoleById(
            user.role_id,
        );

        // Kiểm tra xem user có role nào trong roles yêu cầu không
        return roles.some((role) => roleEntity.role_name === role);
    }
}
