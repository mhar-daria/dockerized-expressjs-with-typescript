'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'GroupRoles',
      {
        groupRoleId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        key: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        roles: {
          allowNull: false,
          defaultValue: {},
          type: Sequelize.JSONB,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Date.now(),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        deletedAt: {
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
    queryInterface.dropTable('GroupRoles')
  },
}
