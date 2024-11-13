/** @format */

"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
    class MessageReactions extends Model {
        static associate(models: any) {
            // user - message reaction
            MessageReactions.belongsTo(models.Users, {
                foreignKey: "user_id",
            });

            // message - message reaction
            MessageReactions.belongsTo(models.Messages, {
                foreignKey: "message_id",
            });
        }
    }
    MessageReactions.init(
        {
            message_id: DataTypes.STRING,
            user_id: DataTypes.STRING,
            icon_type: DataTypes.STRING,
            icon_count: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "MessageReactions",
        },
    );
    return MessageReactions;
};
