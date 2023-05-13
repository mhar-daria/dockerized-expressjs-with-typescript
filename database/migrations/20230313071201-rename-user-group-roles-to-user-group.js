'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('UserGroupRoles', 'UserGroup')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('UserGroup', 'UserGroupRoles')
  },
}
