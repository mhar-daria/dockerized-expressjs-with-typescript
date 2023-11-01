'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'ProductSales',
      {
        productSaleId: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        productId: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          references: {
            model: {
              tableName: 'Products',
            },
            key: 'productId',
          },
          onDelete: 'cascade',
        },
        saleId: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          references: {
            model: {
              tableName: 'Sales',
            },
            key: 'saleId',
          },
          onDelete: 'cascade',
        },
        discount: {
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
        paranoid: true,
        timestamp: true,
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductSales')
  },
}
