'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Factura.init({
    fecha: DataTypes.DATE,
    numero: DataTypes.INTEGER,
    montoDescuento: DataTypes.DECIMAL,
    formaPago: DataTypes.STRING,
    totalVenta: DataTypes.DECIMAL,
    totalCosto: DataTypes.DECIMAL,
    pedidosId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Factura',
  });
  return Factura;
};