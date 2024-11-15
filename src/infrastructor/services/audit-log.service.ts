/** @format */

import { Injectable } from "@nestjs/common";

@Injectable()
export class AuditLogService {
    // Phương thức tạo một audit log mới
    async createAuditLog(
        action: string,
        userId: number,
        details: string,
    ): Promise<void> {
        console.log("Lưu log vào cơ sở dữ liệu...");

        return;
    }
}
