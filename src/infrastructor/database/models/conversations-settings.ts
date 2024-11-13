/** @format */

"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
    class ConversationSettings extends Model {
        static associate(models: any) {
            // conversation - conversation setting
            ConversationSettings.belongsTo(models.Conversations, {
                foreignKey: "conversation_id",
            });
        }
    }
    ConversationSettings.init(
        {
            conversation_id: DataTypes.STRING,
            setting_name: DataTypes.STRING,
            setting_value: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "ConversationSettings",
        },
    );
    return ConversationSettings;
};
