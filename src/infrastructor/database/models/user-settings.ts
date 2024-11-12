'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class UserSettings extends Model {
    static associate(models: any) {
      // define association here
    }
  }
  UserSettings.init({
    user_id: DataTypes.STRING,
    setting_name: DataTypes.STRING,
    setting_value: DataTypes.STRING



  }, {
    sequelize,
    modelName: 'UserSettings',
  });
  return UserSettings;
};