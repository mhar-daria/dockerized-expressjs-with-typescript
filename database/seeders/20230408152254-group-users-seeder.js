'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('GroupUsers', [
      {
        userId: 1,
        groupRoleId: 1,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('GroupUsers', null, {})
  },
}
