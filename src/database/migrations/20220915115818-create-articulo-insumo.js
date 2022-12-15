'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ArticuloInsumos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      denominacion: {
        type: Sequelize.STRING
      },
      precioCompra: {
        type: Sequelize.DECIMAL
      },
      precioVenta: {
        type: Sequelize.DECIMAL
      },
      stockActual: {
        type: Sequelize.DECIMAL
      },
      stockMinimo: {
        type: Sequelize.DECIMAL
      },
      unidadMedida: {
        type: Sequelize.STRING
      },
      esInsumo: {
        type: Sequelize.BOOLEAN
      },
      rubroArticulosId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ArticuloInsumos');
  }
};