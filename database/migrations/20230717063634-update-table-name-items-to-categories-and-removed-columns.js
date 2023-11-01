'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Items', 'parentId')
    await queryInterface.renameTable('Items', 'Categories')
    await queryInterface.renameColumn('Categories', 'itemId', 'categoryId')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('Categories', 'Items')
  },
}
