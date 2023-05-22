import { Dialect, Sequelize } from 'sequelize'
import { loadEnv } from '../helpers/common'

loadEnv()

const dbName: string = process.env.POSTGRES_DB || 'express'
const dbUser: string = process.env.POSTGRES_USER || 'express_user'
const host: string = process.env.POSTGRES_HOST || 'localhost'
const dialect: Dialect = process.env.POSTGRES_DRIVER as Dialect
const dbPasswrod: string = process.env.POSTGRES_PASSWORD || 'password'

const connection = new Sequelize(dbName, dbUser, dbPasswrod, {
  host,
  dialect,
})

export const transaction = connection.transaction

export default connection
