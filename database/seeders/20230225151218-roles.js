'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        roleId: 1,
        key: 'users',
        name: 'Users',
      },
      {
        roleId: 2,
        key: 'canCreateUsers',
        name: 'Create User',
        parentId: 1,
      },
      {
        roleId: 3,
        key: 'canListUserDetails',
        name: 'Get Users',
        parentId: 1,
      },
      {
        roleId: 4,
        key: 'canUpdateUsers',
        name: 'Update User',
        parentId: 1,
      },
      {
        roleId: 5,
        key: 'canDeleteUsers',
        name: 'Delete User',
        parentId: 1,
      },
      {
        roleId: 6,
        key: 'canGetUserDetails',
        name: 'Get User',
        parentId: 1,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {})
  },
}
