/** @format */

"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
    class Participants extends Model {
        static associate(models: any) {
            // user - participant
            Participants.belongsTo(models.Users, {
                foreignKey: "user_id",
            });

            // conversation - participant
            Participants.belongsTo(models.Conversations, {
                foreignKey: "conversation_id",
            });
        }
    }
    Participants.init(
        {
            conversation_id: DataTypes.STRING,
            user_id: DataTypes.STRING,
            joined_at: DataTypes.DOUBLE,
            role: DataTypes.STRING,
            can_send_message: DataTypes.BOOLEAN,
            is_pinned: DataTypes.BOOLEAN,
            pinned_at: DataTypes.DOUBLE,
            is_hidden: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Participants",
        },
    );
    return Participants;
};
