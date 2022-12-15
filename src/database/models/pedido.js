'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pedido.init({
    fecha: DataTypes.DATE,
    numero: DataTypes.INTEGER,
    estado: DataTypes.STRING,
    horaEstimadaFin: DataTypes.STRING,
    tipoEnvio: DataTypes.STRING,
    total: DataTypes.DECIMAL,
    mercadoPagoDatosId: DataTypes.INTEGER,
    clientesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};