'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ArticuloManufacturados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tiempoEstimadoCocina: {
        type: Sequelize.INTEGER
      },
      denominacion: {
        type: Sequelize.STRING
      },
      precioVenta: {
        type: Sequelize.DECIMAL
      },
      imagen: {
        type: Sequelize.STRING
      },
      rubroGeneralsId: {
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
    await queryInterface.dropTable('ArticuloManufacturados');
  }
};