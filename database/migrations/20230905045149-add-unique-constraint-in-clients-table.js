'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Clients', {
      fields: ['firstName', 'lastName', 'address'],
      type: 'unique',
      name: 'fnameLnameAddressUnique',
    })
  },

  async down(queryInterface, Sequelize) {},
}
