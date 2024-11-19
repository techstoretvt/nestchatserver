/** @format */

import { RoleEntity } from "src/domain/entities/role.entity";

export interface IRoleRepository {
    seedRole(): Promise<void>;
    seedPermission(): Promise<void>;
    getRoleByName(name: string): Promise<RoleEntity>;
}
