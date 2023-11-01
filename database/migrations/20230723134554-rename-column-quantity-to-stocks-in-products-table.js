'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Products', 'quantity', 'stocks')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Products', 'stocks', 'quantity')
  },
}
