'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'GroupUsers',
      'UserGroupRoles_userId_fkey'
    )
  },

  async down(queryInterface, Sequelize) {},
}
