'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class ShareMessage extends Model {
    static associate(models: any) {
      // define association here
    }
  }
  ShareMessage.init({
    message_id: DataTypes.STRING,
    message_share_id: DataTypes.STRING



  }, {
    sequelize,
    modelName: 'ShareMessage',
  });
  return ShareMessage;
};