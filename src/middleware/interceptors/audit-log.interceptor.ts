/** @format */

import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { AuditLogService } from "../../infrastructor/services/audit-log.service";
import { tap } from "rxjs/operators";

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
    constructor(private readonly auditLogService: AuditLogService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const userId = request?.user?.id;
        const action = `${request.method} ${request.url}`;
        const details = `User with ID ${userId} performed ${request.method} on ${request.url}`;

        // Ghi log vào cơ sở dữ liệu
        this.auditLogService.createAuditLog(action, userId, details);

        return next.handle().pipe(tap(() => {}));
    }
}
