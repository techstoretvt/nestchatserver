'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class NotifyMessage extends Model {
    static associate(models: any) {
      // define association here
    }
  }
  NotifyMessage.init({
    message_id: DataTypes.STRING,
    notify_type: DataTypes.STRING,  // new_partcipant, leave, timeline, ...
    content: DataTypes.TEXT,
    user_id: DataTypes.STRING,
    timeline: DataTypes.DOUBLE



  }, {
    sequelize,
    modelName: 'NotifyMessage',
  });
  return NotifyMessage;
};