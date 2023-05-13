'use strict'

function generatePassword(rawPassword = '') {
  const { faker } = require('@faker-js/faker')
  const sha256 = require('crypto-js/sha256')

  const salt = faker.internet.password()

  return {
    salt,
    password: sha256(rawPassword + '.' + salt).toString(),
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { faker } = require('@faker-js/faker')
    const { salt, password } = generatePassword('password')

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Development',
        lastName: 'Account',
        username: 'dev-account',
        salt,
        password,
        email: 'dev-account@express.com',
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  },
}
