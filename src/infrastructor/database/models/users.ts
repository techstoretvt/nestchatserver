'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class Users extends Model {
    static associate(models: any) {
      // define association here
    }
  }
  Users.init({
    full_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    auth_provider: DataTypes.STRING, // local, facebook,...
    provider_id: DataTypes.STRING, // allow null
    last_loin: DataTypes.DOUBLE,
    is_online: DataTypes.BOOLEAN,
    last_seen: DataTypes.DOUBLE,    // time action
    role: DataTypes.STRING


  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};