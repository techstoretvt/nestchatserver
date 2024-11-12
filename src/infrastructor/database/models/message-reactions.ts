'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class MessageReactions extends Model {
    static associate(models: any) {
      // define association here
    }
  }
  MessageReactions.init({
    message_id: DataTypes.STRING,
    user_id: DataTypes.STRING,
    icon_type: DataTypes.STRING,
    icon_count: DataTypes.INTEGER



  }, {
    sequelize,
    modelName: 'MessageReactions',
  });
  return MessageReactions;
};