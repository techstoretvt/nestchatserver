/** @format */

"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
    class MediaMessage extends Model {
        static associate(models: any) {
            // message - media message
            MediaMessage.belongsTo(models.Messages, {
                foreignKey: "message_id",
            });
        }
    }
    MediaMessage.init(
        {
            message_id: DataTypes.STRING,
            media_type: DataTypes.STRING, // image, video, audio
            media_url: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "MediaMessage",
        },
    );
    return MediaMessage;
};
