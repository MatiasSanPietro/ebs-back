'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticuloInsumo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArticuloInsumo.init({
    denominacion: DataTypes.STRING,
    precioCompra: DataTypes.DECIMAL,
    precioVenta: DataTypes.DECIMAL,
    stockActual: DataTypes.DECIMAL,
    stockMinimo: DataTypes.DECIMAL,
    unidadMedida: DataTypes.STRING,
    esInsumo: DataTypes.BOOLEAN,
    rubroArticulosId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticuloInsumo',
  });
  return ArticuloInsumo;
};