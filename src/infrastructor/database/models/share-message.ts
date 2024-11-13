/** @format */

"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
    class ShareMessage extends Model {
        static associate(models: any) {
            // message - share message
            ShareMessage.belongsTo(models.Messages, {
                foreignKey: "message_id",
                as: "Message",
            });
            ShareMessage.belongsTo(models.Messages, {
                foreignKey: "message_share_id",
                as: "MessageShare",
            });
        }
    }
    ShareMessage.init(
        {
            message_id: DataTypes.STRING,
            message_share_id: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "ShareMessage",
        },
    );
    return ShareMessage;
};
