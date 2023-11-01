'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Sales', 'status', {
      type: Sequelize.ENUM,
      values: ['reserved', 'pending', 'design', 'processed', 'delivered'],
      defaultValue: 'pending',
    })
    await queryInterface.addColumn('Sales', 'payment', {
      type: Sequelize.ENUM,
      values: ['paid', 'downpayment', 'cod'],
      defaultValue: 'downpayment',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Sales', ['status', 'payment'])
  },
}
