'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MercadoPagoDatos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      identificadorPago: {
        type: Sequelize.STRING
      },
      fechaCreacion: {
        type: Sequelize.DATE
      },
      fechaAprobacion: {
        type: Sequelize.DATE
      },
      formaPago: {
        type: Sequelize.STRING
      },
      metodoPago: {
        type: Sequelize.STRING
      },
      nroTarjeta: {
        type: Sequelize.STRING
      },
      estado: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('MercadoPagoDatos');
  }
};