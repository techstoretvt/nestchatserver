'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class Messages extends Model {
    static associate(models: any) {
      // define association here
    }
  }
  Messages.init({
    conversation_id: DataTypes.STRING,
    sender_id: DataTypes.STRING,
    message_type: DataTypes.STRING,
    content: DataTypes.TEXT,
    status: DataTypes.STRING, // sent, recieved, seen
    is_pined: DataTypes.BOOLEAN



  }, {
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};