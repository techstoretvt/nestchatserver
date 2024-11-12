'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class Convertations extends Model {
    static associate(models: any) {
      // define association here
    }
  }
  Convertations.init({
    group_name: DataTypes.STRING,
    is_group: DataTypes.BOOLEAN,
    last_message_at: DataTypes.DOUBLE,
    background_image: DataTypes.TEXT,
    status: DataTypes.STRING    // active, deleted, suspeneded



  }, {
    sequelize,
    modelName: 'Convertations',
  });
  return Convertations;
};