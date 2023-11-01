import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import {
  ALLOWED_ORIGINS,
  ALLOWED_METHODS,
  ALLOWED_HEADERS,
} from '../config/cors'
import mainRoutes from './routes'
import { errorHandler } from './helpers/ErrorHandler'
import _ from 'lodash'
import LoggerMiddleware from './middlewares/LoggerMiddleware'
import { AddressInfo } from 'net'
import { corsOrigin } from './helpers/cors'

dotenv.config({ path: __dirname + '/../../.env' })

const app: Express = express()

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
    allowedHeaders: ALLOWED_HEADERS?.join(','),
    methods: ALLOWED_METHODS?.join(','),
  })
)

app.use(LoggerMiddleware)

app.get('/', (req: Request, res: Response) => {
  res.send('express + typescript')
})

const listener = app.listen(
  parseInt(process.env.PORT as string, 10),
  '0.0.0.0',
  () => {
    console.log(
      `[server]: Server is running at ${process.env.HOST}:${process.env.PORT}`
    )
  }
)

app.use(bodyParser.json())
mainRoutes(app)
app.use(errorHandler)

export default app
export const port = () => {
  const address = listener.address() as AddressInfo
  return address.port
}
// module.exports = app
