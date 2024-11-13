/** @format */

"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
    class BlockedUsers extends Model {
        static associate(models: any) {
            // user - blocked user
            BlockedUsers.belongsTo(models.Users, {
                foreignKey: "user_id",
                as: "UserBlock",
            });
            BlockedUsers.belongsTo(models.Users, {
                foreignKey: "friend_id",
                as: "FriendBlock",
            });
        }
    }
    BlockedUsers.init(
        {
            user_id: DataTypes.STRING,
            friend_id: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "BlockedUsers",
        },
    );
    return BlockedUsers;
};
