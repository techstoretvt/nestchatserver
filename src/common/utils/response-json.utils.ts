/** @format */

export const ResponseJsonUtils = (
    status: number,
    message: string,
    path: string,
    exceptionName: string,
) => ({
    statusCode: status,
    timestamp: new Date().toISOString(),
    path,
    message,
    error: exceptionName || "UnknownError",
});
