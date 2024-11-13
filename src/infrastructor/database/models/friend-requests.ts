/** @format */

"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
    class FriendRequests extends Model {
        static associate(models: any) {
            // user - friend request
            FriendRequests.belongsTo(models.Users, {
                foreignKey: "from_user_id",
                as: "FromUser",
            });
            FriendRequests.belongsTo(models.Users, {
                foreignKey: "to_user_id",
                as: "ToUser",
            });
        }
    }
    FriendRequests.init(
        {
            from_user_id: DataTypes.STRING,
            to_user_id: DataTypes.STRING,
            request_message: DataTypes.STRING,
            status: DataTypes.STRING, // pending, accepted, canceled
            response_time: DataTypes.DOUBLE,
        },
        {
            sequelize,
            modelName: "FriendRequests",
        },
    );
    return FriendRequests;
};
