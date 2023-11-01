'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Sales',
      {
        saleId: {
          type: Sequelize.BIGINT,
          allowNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
        clientId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: {
              tableName: 'Clients',
            },
            key: 'clientId',
          },
        },
        dueDate: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: new Date(new Date().setDate(new Date().getDate() + 1)),
        },
        itemId: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          references: {
            model: {
              tableName: 'Items',
            },
            key: 'itemId',
          },
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0.0,
        },
        discount: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null,
        },
        notes: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Date.now(),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        deletedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        paranoid: true,
        timestamp: true,
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sales')
  },
}
