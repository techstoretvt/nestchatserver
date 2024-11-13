/** @format */

"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
    class Messages extends Model {
        static associate(models: any) {
            // user - message
            Messages.belongsTo(models.Users, {
                foreignKey: "sender_id",
            });

            // conversation - message
            Messages.belongsTo(models.Conversations, {
                foreignKey: "conversation_id",
            });

            // message - notify message
            Messages.hasMany(models.NotifyMessage, {
                foreignKey: "message_id",
            });

            // message - contact card message
            Messages.hasMany(models.ContactCardMessage, {
                foreignKey: "message_id",
            });

            // message - share message
            Messages.hasMany(models.ShareMessage, {
                foreignKey: "message_id",
                as: "MessageShareMessage",
            });
            Messages.hasMany(models.ShareMessage, {
                foreignKey: "message_share_id",
                as: "ShareShareMessage",
            });

            // message - media message
            Messages.hasMany(models.MediaMessage, {
                foreignKey: "message_id",
            });

            // message - message reaction
            Messages.hasMany(models.MessageReactions, {
                foreignKey: "message_id",
            });
        }
    }
    Messages.init(
        {
            conversation_id: DataTypes.STRING,
            sender_id: DataTypes.STRING,
            message_type: DataTypes.STRING,
            content: DataTypes.TEXT,
            status: DataTypes.STRING, // sent, recieved, seen
            is_pined: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Messages",
        },
    );
    return Messages;
};
