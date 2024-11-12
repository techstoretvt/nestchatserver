'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class Friendships extends Model {
    static associate(models: any) {
      // define association here
    }
  }
  Friendships.init({
    requester_id: DataTypes.STRING,
    accepter_id: DataTypes.STRING


  }, {
    sequelize,
    modelName: 'Friendships',
  });
  return Friendships;
};