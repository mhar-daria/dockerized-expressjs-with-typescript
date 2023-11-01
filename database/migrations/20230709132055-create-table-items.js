'use strict'

const sequelize = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Items',
      {
        itemId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.SMALLINT,
        },
        parentId: {
          allowNull: true,
          type: Sequelize.SMALLINT,
          references: {
            model: {
              tableName: 'Items',
            },
            key: 'itemId',
          },
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        description: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Date.now(),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
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
    await queryInterface.dropTable('Items')
  },
}
