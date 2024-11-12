'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class BlockedUsers extends Model {
    static associate(models: any) {
      // define association here
    }
  }
  BlockedUsers.init({
    user_id: DataTypes.STRING,
    friend_id: DataTypes.STRING


  }, {
    sequelize,
    modelName: 'BlockedUsers',
  });
  return BlockedUsers;
};