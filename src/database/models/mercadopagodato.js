'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MercadoPagoDato extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MercadoPagoDato.init({
    identificadorPago: DataTypes.STRING,
    fechaCreacion: DataTypes.DATE,
    fechaAprobacion: DataTypes.DATE,
    formaPago: DataTypes.STRING,
    metodoPago: DataTypes.STRING,
    nroTarjeta: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MercadoPagoDato',
  });
  return MercadoPagoDato;
};