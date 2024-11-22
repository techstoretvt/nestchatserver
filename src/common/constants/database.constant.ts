/** @format */

export const UserProvider = {
    LOCAL: "local",
    GOOGLE: "google",
    FACEBOOK: "facebook",
};

export const avatarDefault =
    "https://github.com/techstoretvt/nestchatserver/blob/main/public/images/default-avatar.jpg?raw=true";

export const RoleNameConstants = {
    USER: "user",
    ADMIN: "admin",
    SUPERADMIN: "super_admin",
    MODERATOR: "moderator",
};

export const SettingUserDefault = [
    {
        name: "theme",
        value: "light",
    },
    {
        name: "language",
        value: "en",
    },
    {
        name: "allow_non_friends_to_message",
        value: "true",
    },
];
