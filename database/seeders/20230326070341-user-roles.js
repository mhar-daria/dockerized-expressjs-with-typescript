'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const userRoles = [
      {
        userRoleId: 1,
        userId: 1,
        roles: {
          users: ['canListUserDetails'],
        },
      },
    ]
    await queryInterface.bulkInsert(
      'UserRoles',
      userRoles,
      {},
      {
        roles: {
          type: new Sequelize.JSON(),
        },
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserRoles', null, {})
  },
}
