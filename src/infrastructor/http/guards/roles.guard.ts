import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

// Inject Reflector để lấy metadata được gán từ Decorators
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // Lấy metadata 'roles' gắn trong route handler, khai báo @Roles('admin') trong mỗi controller
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true; // Nếu không có metadata roles, cho phép truy cập
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user; // Giả sử thông tin người dùng đã được xác thực và lưu trong request.user

        // Kiểm tra xem user có role nào trong roles yêu cầu không
        return roles.some(role => user.roles?.includes(role));
    }
}
