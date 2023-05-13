'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'UserGroupRoles',
      {
        userGroupRoleId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        userId: {
          allowNull: false,
          type: Sequelize.BIGINT,
          references: {
            model: {
              tableName: 'Users',
            },
            key: 'userId',
          },
        },
        groupRoleId: {
          allowNull: false,
          type: Sequelize.BIGINT,
          references: {
            model: {
              tableName: 'GroupRoles',
            },
            key: 'groupRoleId',
          },
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
    await queryInterface.dropTable('GroupUserGroup')
  },
}
