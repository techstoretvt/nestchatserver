/** @format */

export const ThrottlerConstants = {
    GLOBAL_REQUEST_LIMIT: 100, // Giới hạn 100 yêu cầu mỗi phút cho tất cả các route
    GLOBAL_REQUEST_TTL: 60000,

    MESSAGE_ROUTE_LIMIT: 100, // Giới hạn 100 yêu cầu gửi tin nhắn mỗi phút
    MESSAGE_ROUTE_TTL: 60000,
};
