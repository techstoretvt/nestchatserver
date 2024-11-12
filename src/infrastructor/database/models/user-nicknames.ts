'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class UserNicknames extends Model {
    static associate(models: any) {
      // define association here
    }
  }
  UserNicknames.init({
    user_id: DataTypes.STRING,
    friend_id: DataTypes.STRING,
    nickname: DataTypes.STRING



  }, {
    sequelize,
    modelName: 'UserNicknames',
  });
  return UserNicknames;
};