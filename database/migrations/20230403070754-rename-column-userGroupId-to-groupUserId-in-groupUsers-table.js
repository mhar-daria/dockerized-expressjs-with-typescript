'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'GroupUsers',
      'userGroupId',
      'groupUserId'
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'GroupUsers',
      'groupUserId',
      'userGroupId'
    )
  },
}
