'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'name', {
      type: Sequelize.STRING,
      unique: true,
      after: 'categoryId',
      allowNull: false,
    })
  },

  async down(queryInterface, Sequelize) {},
}
