'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('UserGroup', 'GroupUsers')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('GroupUsers', 'UserGroup')
  },
}
