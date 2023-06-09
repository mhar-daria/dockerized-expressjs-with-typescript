'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('GroupUsers', 'userId', {
      type: Sequelize.BIGINT,
      references: {
        model: 'Users',
        key: 'userId',
      },
      onDelete: 'cascade',
    })
  },

  async down(queryInterface, Sequelize) {},
}
