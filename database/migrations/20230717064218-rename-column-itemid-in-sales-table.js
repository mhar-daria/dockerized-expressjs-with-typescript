'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Sales', 'itemId', 'productId')
  },

  async down(queryInterface, Sequelize) {},
}
