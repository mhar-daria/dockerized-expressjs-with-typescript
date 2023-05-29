import { Dialect, Sequelize } from 'sequelize'
import { loadEnv } from '../helpers/common'
import dotenv from 'dotenv'
import { dirname } from 'path'

// loadEnv()
dotenv.config({ path: __dirname + '/../../.env' })

const dbName: string = process.env.POSTGRES_DB || 'express'
const dbUser: string = process.env.POSTGRES_USER || 'express_user'
const host: string = process.env.POSTGRES_HOST || 'localhost'
const dialect: Dialect = (process.env.POSTGRES_DRIVER as Dialect) || 'postgres'
const dbPasswrod: string = process.env.POSTGRES_PASSWORD || 'password'

const connection = new Sequelize(dbName, dbUser, dbPasswrod, {
  host,
  dialect,
})

export const transaction = connection.transaction

export default connection
