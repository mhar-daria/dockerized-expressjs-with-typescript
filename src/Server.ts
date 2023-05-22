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

dotenv.config()

const app: Express = express()
const port = 9001

app.get('/', (req: Request, res: Response) => {
  res.send('express + typescript')
})

app.listen(port, () => {
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

app.on('ModelException', (reason) => {
  console.log('rejected')
})
