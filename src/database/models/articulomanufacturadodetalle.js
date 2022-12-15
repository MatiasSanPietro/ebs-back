'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticuloManufacturadoDetalle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ArticuloManufacturadoDetalle.init({
    cantidad: DataTypes.DECIMAL,
    unidadMedida: DataTypes.STRING,
    articuloManufacturadosId: DataTypes.INTEGER,
    articuloInsumosId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticuloManufacturadoDetalle',
  });
  return ArticuloManufacturadoDetalle;
};