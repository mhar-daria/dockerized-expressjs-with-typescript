'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        categoryId: 1,
        name: 'Papers',
        description: 'All about papers',
      },
      {
        categoryId: 2,
        name: 'Mugs',
        description: 'All about mugs',
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  },
}
