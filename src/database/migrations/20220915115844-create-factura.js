'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Facturas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE
      },
      numero: {
        type: Sequelize.INTEGER
      },
      montoDescuento: {
        type: Sequelize.DECIMAL
      },
      formaPago: {
        type: Sequelize.STRING
      },
      totalVenta: {
        type: Sequelize.DECIMAL
      },
      totalCosto: {
        type: Sequelize.DECIMAL
      },
      pedidosId: {
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
    await queryInterface.dropTable('Facturas');
  }
};