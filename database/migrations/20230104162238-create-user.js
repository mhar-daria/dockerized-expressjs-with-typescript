'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Users',
      {
        userId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        firstName: {
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        username: {
          type: Sequelize.STRING,
        },
        salt: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  },
}
