'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class FriendRequests extends Model {
    static associate(models: any) {
      // define association here
    }
  }
  FriendRequests.init({
    from_user_id: DataTypes.STRING,
    to_user_id: DataTypes.STRING,
    request_message: DataTypes.STRING,
    status: DataTypes.STRING,  // pending, accepted, canceled
    response_time: DataTypes.DOUBLE



  }, {
    sequelize,
    modelName: 'FriendRequests',
  });
  return FriendRequests;
};