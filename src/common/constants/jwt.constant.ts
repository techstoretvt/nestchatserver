/** @format */
import { ConfigService } from "@nestjs/config";
export const jwtTokenConstants = {
    accessTokenExp: "1h",
    refreshTokenExp: "7d",
    refreshTokenExpNumber: 60 * 60 * 24 * 7,
};
