/** @format */

export const ResponseJsonUtils = (
    status: number,
    message: string,
    other?: Object,
) => {
    return {
        status,
        message,
        ...other,
    };
};
