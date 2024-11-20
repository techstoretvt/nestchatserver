/** @format */

import { Inject, Injectable } from "@nestjs/common";
import {
    IUserRepository,
    IRoleRepository,
} from "src/domain/interfaces/repositories/index";
import {
    IAuthService,
    ISeedService,
} from "src/domain/interfaces/services/index";

@Injectable()
export class SeedService implements ISeedService {
    constructor(
        @Inject("IUserRepository")
        private readonly userRepository: IUserRepository,
        @Inject("IRoleRepository")
        private readonly roleRepository: IRoleRepository,
        @Inject("IAuthService")
        private readonly authService: IAuthService,
    ) {}

    async seedUser(): Promise<void> {
        try {
            let user = await this.userRepository.getUserByUsername(
                process.env.SUPER_ADMIN_USERNAME,
            );
            if (user) return;
        } catch (error) {}
        let userRole = await this.roleRepository.getRoleByName("super_admin");
        if (!userRole) return;
        let hash_password = await this.authService.hashPassword(
            process.env.SUPER_ADMIN_PASSWORD,
        );
        await this.userRepository.seedUser({
            full_name: "Super Admin",
            username: "superadmin",
            hash_password: hash_password,
            role_id: userRole._id,
        });
    }
    async seedRole(): Promise<void> {
        await this.roleRepository.seedRole();
    }
    async seedPermission(): Promise<void> {
        await this.roleRepository.seedPermission();
    }
    async seed(): Promise<void> {
        this.seedRole();
        this.seedPermission();
        this.seedUser();
    }
}
