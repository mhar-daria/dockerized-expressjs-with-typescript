'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'discount')
    await queryInterface.removeColumn('Products', 'contact')
    await queryInterface.removeColumn('Products', 'supplier')
  },

  async down(queryInterface, Sequelize) {},
}
