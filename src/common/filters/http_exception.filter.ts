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
import { ResponseJsonUtils } from "../utils/response-json.utils";

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

        console.log(exception.getResponse());

        // Nếu exception không phải HttpException, lấy thông báo lỗi từ exception.message
        let message = "An unexpected error occurred";
        const exceptionResponse = exception.getResponse();
        if (exceptionResponse && typeof exceptionResponse === "object") {
            const messateType = typeof exceptionResponse?.message;
            message =
                messateType === "string"
                    ? exceptionResponse?.message
                    : exceptionResponse?.message[0];
        }

        // Log lỗi chi tiết
        this.logger.error(`Error occurred at ${request.url}`);
        this.logger.error(exception.message);

        // Trả về response đẹp, cung cấp thông tin chi tiết về lỗi
        response
            .status(status)
            .json(
                ResponseJsonUtils(status, message, request.url, exception.name),
            );
    }
}
