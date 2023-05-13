const fs = require('fs')
require('dotenv').config()
module.exports = {
  development: {
    port: process.env.POSTGRES_PORT || '5432',
    username: process.env.POSTGRES_USER || 'express',
    password: process.env.POSTGRES_PASSWORD || 'expresspostgres',
    database: process.env.POSTGRES_DB || 'express_db',
    host: process.env.POSTGRES_HOST || 'db',
    dialect: process.env.DRIVER || 'postgres',
    seederStorage: 'json',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    port: process.env.POSTGRES_PORT || '7772',
    username: process.env.POSTGRES_USER || 'express',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DB || 'database',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    dialect: process.env.DRIVER || 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    port: process.env.POSTGRES_PORT || '7772',
    username: process.env.POSTGRES_USER || 'express',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DB || 'database',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    dialect: process.env.DRIVER || 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
}
