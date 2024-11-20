/** @format */

export const getUserRefreshTokenKey = (userId: string, client_id: string) => {
    return `user:${userId}:session:${client_id}:refreshToken`;
};
