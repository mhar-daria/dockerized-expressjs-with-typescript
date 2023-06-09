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
import './utils/LodashMixins'

dotenv.config({ path: __dirname + '/../../.env' })

const app: Express = express()

app.get('/', (req: Request, res: Response) => {
  res.send('express + typescript')
})

app.listen(process.env.PORT, () => {
  console.log(
    `[server]: Server is running at ${process.env.HOST}:${process.env.PORT}`
  )
})

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
    allowedHeaders: ALLOWED_HEADERS?.join(','),
    methods: ALLOWED_METHODS?.join(','),
  })
)

app.use(bodyParser.json())
mainRoutes(app)
app.use(errorHandler)

export default app
