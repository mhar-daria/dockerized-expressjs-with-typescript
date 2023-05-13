'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'UserGroup',
      'userGroupRoleId',
      'userGroupId'
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'UserGroup',
      'userGroupId',
      'userGroupRoleId'
    )
  },
}
