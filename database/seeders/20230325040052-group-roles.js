'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const groupRoles = [
      {
        groupRoleId: 1,
        name: 'Admin',
        key: 'admin',
        roles: {
          users: [
            'canCreateUsers',
            'canUpdateUsers',
            'canDeleteUsers',
            'canListUserDetails',
            'canGetUserDetails',
          ],
        },
      },
    ]
    await queryInterface.bulkInsert(
      'GroupRoles',
      groupRoles,
      {},
      {
        roles: {
          type: new Sequelize.JSON(),
        },
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('GroupRoles', null, {})
  },
}
