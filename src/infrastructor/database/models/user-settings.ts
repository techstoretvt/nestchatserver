/** @format */

"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
    class UserSettings extends Model {
        static associate(models: any) {
            // user - setting user
            UserSettings.belongsTo(models.Users, {
                foreignKey: "user_id",
            });
        }
    }
    UserSettings.init(
        {
            user_id: DataTypes.STRING,
            setting_name: DataTypes.STRING,
            setting_value: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "UserSettings",
        },
    );
    return UserSettings;
};
