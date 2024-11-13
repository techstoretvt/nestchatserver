/** @format */

"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
    class Conversations extends Model {
        static associate(models: any) {
            // conversation - participant
            Conversations.hasMany(models.Participants, {
                foreignKey: "conversation_id",
            });
            // conversation - message
            Conversations.hasMany(models.Messages, {
                foreignKey: "conversation_id",
            });
            // conversation - conversation setting
            Conversations.hasMany(models.ConversationSettings, {
                foreignKey: "conversation_id",
            });
        }
    }
    Conversations.init(
        {
            group_name: DataTypes.STRING,
            is_group: DataTypes.BOOLEAN,
            last_message_at: DataTypes.DOUBLE,
            background_image: DataTypes.TEXT,
            status: DataTypes.STRING, // active, deleted, suspeneded
        },
        {
            sequelize,
            modelName: "Conversations",
        },
    );
    return Conversations;
};
