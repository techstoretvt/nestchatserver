'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class ContactCardMessage extends Model {
    static associate(models: any) {
      // define association here
    }
  }
  ContactCardMessage.init({
    message_id: DataTypes.STRING,
    user_id: DataTypes.STRING



  }, {
    sequelize,
    modelName: 'ContactCardMessage',
  });
  return ContactCardMessage;
};