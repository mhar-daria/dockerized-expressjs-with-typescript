'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Products',
      {
        productId: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
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
        quantity: {
          type: Sequelize.SMALLINT,
          allowNull: false,
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        discount: {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
        contact: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        supplier: {
          type: Sequelize.STRING,
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
        timestamp: true,
        paranoid: true,
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products')
  },
}
