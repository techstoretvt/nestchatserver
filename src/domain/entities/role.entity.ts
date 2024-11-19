/** @format */

export class RoleEntity {
    _id: string;

    role_name: string;

    role_description: string;

    permissions: { permission_id: string }[];
}
