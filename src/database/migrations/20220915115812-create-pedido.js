'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pedidos', {
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
      estado: {
        type: Sequelize.STRING
      },
      horaEstimadaFin: {
        type: Sequelize.STRING
      },
      tipoEnvio: {
        type: Sequelize.STRING
      },
      total: {
        type: Sequelize.DECIMAL
      },
      mercadoPagoDatosId: {
        type: Sequelize.INTEGER
      },
      clientesId: {
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
    await queryInterface.dropTable('Pedidos');
  }
};