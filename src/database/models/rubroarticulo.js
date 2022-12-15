'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RubroArticulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RubroArticulo.init({
    denominacion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'RubroArticulo',
  });
  return RubroArticulo;
};