'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        productId: 1,
        categoryId: 1,
        quantity: 1,
        price: 220,
        name: 'Sublimation Paper A4',
      },
      {
        productId: 2,
        categoryId: 1,
        quantity: 1,
        price: 80,
        name: 'White Sticker Vinyl',
      },
      {
        productId: 3,
        categoryId: 2,
        quantity: 6,
        price: 30,
        name: 'Cernamic Mugs (Plain)',
      },
      {
        productId: 4,
        categoryId: 2,
        quantity: 6,
        price: 68,
        name: 'Ceramic Mugs (Magic)',
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null)
  },
}
