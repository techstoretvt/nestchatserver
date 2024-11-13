/** @format */

"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
    class ContactCardMessage extends Model {
        static associate(models: any) {
            // user - contact card message
            ContactCardMessage.belongsTo(models.Users, {
                foreignKey: "user_id",
            });

            // message - contact card message
            ContactCardMessage.belongsTo(models.Messages, {
                foreignKey: "message_id",
            });
        }
    }
    ContactCardMessage.init(
        {
            message_id: DataTypes.STRING,
            user_id: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "ContactCardMessage",
        },
    );
    return ContactCardMessage;
};
