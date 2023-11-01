import { Dialect, Sequelize } from 'sequelize'
import dotenv from 'dotenv'

// loadEnv()
console.log(process.env.LOAD_ENV)

const envFile = `${__dirname}/../../.env${
  process.env.LOAD_ENV ? '.' + process.env.LOAD_ENV : ''
}`
dotenv.config({ path: envFile })

console.log(`Loaded configuration file "${envFile}".`)
console.log('Environment "' + process.env.NODE_ENV + '".')

const dbName: string = process.env.POSTGRES_DB || 'express'
const dbUser: string = process.env.POSTGRES_USER || 'express_user'
const host: string = process.env.POSTGRES_HOST || 'localhost'
const dialect: Dialect = (process.env.POSTGRES_DRIVER as Dialect) || 'postgres'
const dbPasswrod: string = process.env.POSTGRES_PASSWORD || 'password'

const connection = new Sequelize(dbName, dbUser, dbPasswrod, {
  host,
  dialect,
})

export default connection
