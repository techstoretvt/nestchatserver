/** @format */

import { InjectModel } from "@nestjs/mongoose";
import { IRoleRepository } from "src/domain/interfaces/repositories/role.repository.interface";
import { Role } from "../database/schemas/role.schema";
import { Model } from "mongoose";
import { Permission } from "../database/schemas/permission.schema";
import { RoleEntity } from "src/domain/entities/role.entity";
import { plainToInstance } from "class-transformer";

export class RoleResitoryImpl implements IRoleRepository {
    constructor(
        @InjectModel(Role.name) private roleModel: Model<Role>,
        @InjectModel(Permission.name)
        private permissionModel: Model<Permission>,
    ) {}
    async getRoleByName(name: string): Promise<RoleEntity> {
        let role = await this.roleModel.findOne({ role_name: name }).exec();
        if (!role) return null;
        let roleEntity = plainToInstance(RoleEntity, role, {
            excludeExtraneousValues: true,
        });
        roleEntity._id = role._id.toString();
        return roleEntity;
    }

    private lístRoles = [
        {
            role_name: "super_admin",
            role_description: "Super admin role",
            permissions: [
                "MANAGE_ROLES",
                "MANAGE_USERS",
                "DELETE_MESSAGE",
                "BAN_USER",
                "VIEW_STATS",
                "VIEW_ALL_MESSAGES",
                "CREATE_ADMIN",
                "ACCESS_SYSTEM_SETTINGS",
            ],
        },
        {
            role_name: "admin",
            role_description: "Admin role",
            permissions: [
                "MANAGE_USERS",
                "DELETE_MESSAGE",
                "BAN_USER",
                "VIEW_STATS",
                "VIEW_ALL_MESSAGES",
                "ACCESS_USER_PROFILES",
            ],
        },

        {
            role_name: "moderator",
            role_description: "Moderator role",
            permissions: [
                "DELETE_MESSAGE",
                "BAN_USER",
                "VIEW_ALL_MESSAGES",
                "REPORT_USER",
                "WARN_USER",
            ],
        },
        {
            role_name: "user",
            role_description: "User role",
            permissions: [
                "CREATE_MESSAGE",
                "EDIT_MESSAGE",
                "DELETE_MESSAGE",
                "SEND_IMAGE",
                "SEND_AUDIO",
                "CREATE_GROUP",
            ],
        },
    ];

    private listPermissions = [
        {
            permission_name: "MANAGE_ROLES",
            permission_description: "Manage roles permission",
        },
        {
            permission_name: "MANAGE_USERS",
            permission_description: "Manage users permission",
        },
        {
            permission_name: "DELETE_MESSAGE",
            permission_description: "Delete message permission",
        },
        {
            permission_name: "BAN_USER",
            permission_description: "Ban user permission",
        },
        {
            permission_name: "VIEW_STATS",
            permission_description: "View stats permission",
        },
        {
            permission_name: "VIEW_ALL_MESSAGES",
            permission_description: "View all messages permission",
        },
        {
            permission_name: "CREATE_ADMIN",
            permission_description: "Create admin permission",
        },
        {
            permission_name: "ACCESS_SYSTEM_SETTINGS",
            permission_description: "Access system settings permission",
        },
        {
            permission_name: "ACCESS_USER_PROFILES",
            permission_description: "Access user profiles permission",
        },
        {
            permission_name: "REPORT_USER",
            permission_description: "Report user permission",
        },
        {
            permission_name: "WARN_USER",
            permission_description: "Warn user permission",
        },
        {
            permission_name: "EDIT_MESSAGE",
            permission_description: "Edit message permission",
        },
    ];

    async seedRole(): Promise<void> {
        let getListPermission = await this.permissionModel.find().exec();

        let createListRole = this.lístRoles.map((item) => {
            return {
                ...item,
                permissions: getListPermission
                    .filter((permission) =>
                        item.permissions.includes(permission.permission_name),
                    )
                    .map((item) => {
                        return {
                            permission_id: item._id.toString(),
                        };
                    }),
            };
        });

        try {
            await this.roleModel.insertMany(createListRole);
        } catch (error) {}
    }

    async seedPermission(): Promise<void> {
        try {
            await this.permissionModel.insertMany(this.listPermissions);
        } catch (error) {}
    }
}
