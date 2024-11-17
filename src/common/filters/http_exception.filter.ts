/** @format */

import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from "@nestjs/common";
import { Response } from "express";
import { Request } from "express";

@Catch() // Bắt tất cả các loại exception
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        // Kiểm tra nếu exception là HttpException
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        // Nếu exception không phải HttpException, lấy thông báo lỗi từ exception.message
        const message = exception.message || "An unexpected error occurred";

        // Log lỗi chi tiết
        this.logger.error(`Error occurred at ${request.url}`);
        this.logger.error(exception.message);

        // Trả về response đẹp, cung cấp thông tin chi tiết về lỗi
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: message,
            // Có thể thêm trường 'error' để cung cấp tên exception nếu cần thiết
            error: exception.name || "UnknownError",
        });
    }
}
