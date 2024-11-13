/** @format */

"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
    class Users extends Model {
        static associate(models: any) {
            // user - friendship
            Users.hasMany(models.Friendships, {
                foreignKey: "requester_id",
                as: "RequestedFriendships",
            });
            Users.hasMany(models.Friendships, {
                foreignKey: "accepter_id",
                as: "AcceptedFriendships",
            });
            // user - setting user
            Users.hasMany(models.UserSettings, {
                foreignKey: "user_id",
            });
            // user - user nickname
            Users.hasMany(models.UserNicknames, {
                foreignKey: "user_id",
                as: "UserUserNicknames",
            });
            Users.hasMany(models.UserNicknames, {
                foreignKey: "friend_id",
                as: "FriendUserNicknames",
            });
            // user - blocked user
            Users.hasMany(models.BlockedUsers, {
                foreignKey: "user_id",
                as: "UserBlockedUsers",
            });
            Users.hasMany(models.BlockedUsers, {
                foreignKey: "friend_id",
                as: "FriendBlockedUsers",
            });
            // user - friend request
            Users.hasMany(models.FriendRequests, {
                foreignKey: "to_user_id",
                as: "ToUserFriendRequests",
            });
            Users.hasMany(models.FriendRequests, {
                foreignKey: "from_user_id",
                as: "FromUserFriendRequests",
            });
            // user - participant
            Users.hasMany(models.Participants, {
                foreignKey: "user_id",
            });
            // user - notify message
            Users.hasMany(models.NotifyMessage, {
                foreignKey: "user_id",
            });
            // user - contact card message
            Users.hasMany(models.ContactCardMessage, {
                foreignKey: "user_id",
            });
            // user - message
            Users.hasMany(models.Messages, {
                foreignKey: "sender_id",
            });
            // user - message reaction
            Users.hasMany(models.MessageReactions, {
                foreignKey: "user_id",
            });
        }
    }
    Users.init(
        {
            full_name: DataTypes.STRING,
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            avatar: DataTypes.TEXT,
            auth_provider: DataTypes.STRING, // local, facebook,...
            provider_id: DataTypes.STRING, // allow null
            last_loin: DataTypes.DOUBLE,
            is_online: DataTypes.BOOLEAN,
            last_seen: DataTypes.DOUBLE, // time action
            role: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Users",
        },
    );
    return Users;
};
