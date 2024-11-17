/** @format */

import { CacheModule } from "@nestjs/cache-manager";
import { CacheConstants } from "src/common/constants";

export const cacheConfig = () => {
    return CacheModule.register({
        ttl: CacheConstants.CACHE_EXPIRED,
        max: CacheConstants.MAX_RESULT,
    });
};
