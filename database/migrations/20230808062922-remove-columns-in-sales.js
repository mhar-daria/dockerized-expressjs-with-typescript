'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.removeColumn('Sales', 'productId')
    await queryInterface.removeColumn('Sales', 'price')
    await queryInterface.removeColumn('Sales', 'discount')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Sales', 'productId', {
      type: Sequelize.SMALLINT,
    })
    await queryInterface.addColumn('Sales', 'price', {
      type: Sequelize.FLOAT,
    })
    await queryInterface.addColumn('Sales', 'discount', {
      type: Sequelize.STRING,
    })
  },
}
