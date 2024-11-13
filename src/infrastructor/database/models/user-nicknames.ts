/** @format */

"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
    class UserNicknames extends Model {
        static associate(models: any) {
            // user - user nickname
            UserNicknames.belongsTo(models.Users, {
                foreignKey: "user_id",
                as: "User",
            });
            UserNicknames.belongsTo(models.Users, {
                foreignKey: "friend_id",
                as: "Friend",
            });
        }
    }
    UserNicknames.init(
        {
            user_id: DataTypes.STRING,
            friend_id: DataTypes.STRING,
            nickname: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "UserNicknames",
        },
    );
    return UserNicknames;
};
