import { Express } from 'express'
import api from './api'
import route_2022_12_19 from './route_2022_12_19'

export default (app: Express) => {
  app.use('/api', api)
  app.use('/api/20221219/', route_2022_12_19)
  app.all('*', (req, res) => {
    return res.send({ message: 'Page not found.' })
  })
}
