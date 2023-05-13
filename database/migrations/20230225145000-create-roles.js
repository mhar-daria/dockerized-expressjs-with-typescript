'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Roles',
      {
        roleId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        key: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        parentId: {
          allowNull: true,
          defaultValue: null,
          type: Sequelize.SMALLINT,
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
        timestamps: true,
        paranoid: true,
      }
    )
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
}
