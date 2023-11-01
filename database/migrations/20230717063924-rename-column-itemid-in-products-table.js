'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Products', 'itemId', 'categoryId')
  },

  async down(queryInterface, Sequelize) {},
}
