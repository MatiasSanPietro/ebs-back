'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Configuracion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Configuracion.init({
    cantidadCocineros: DataTypes.INTEGER,
    emailEmpresa: DataTypes.STRING,
    tokenMercadoPago: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Configuracion',
  });
  return Configuracion;
};