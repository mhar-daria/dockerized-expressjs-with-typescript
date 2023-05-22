'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'GroupRoles',
      [
        {
          groupRoleId: 2,
          name: 'Guest',
          key: 'guest',
          roles: [
            {
              users: ['canListUserDetails', 'canGetUserDetails'],
            },
          ],
        },
      ],
      {},
      {
        roles: {
          type: new Sequelize.JSON(),
        },
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('GroupRoles', {
      groupRoleId: 2,
    })
  },
}
