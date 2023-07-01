import { NextFunction, Request, Response, response } from 'express'
import File from '../utils/File'
import { ReadStream } from 'fs'
// import morgan from 'morgan'
import moment from 'moment'

class Logger {
  req: Request
  options: { [key: string]: any } = {}
  file: File

  constructor(req: Request, options: { [key: string]: any }) {
    this.req = req
    this.options = options
    this.file = new File()
  }

  log(): void {
    const date = moment().format('YYYY-MM-DD')

    const requestBody = this.req.body
    const queryParameters = this.req.params
    const timestamp = moment().format('YYYY-MM-DD H:i:s')
    const headers = this.req.headers

    try {
      this.file.write(
        `logs/${date}.access.log`,
        `${JSON.stringify({
          ...this.options,
          RequestBody: requestBody,
          QueryParameters: queryParameters,
          Timestamp: timestamp,
          RequestHeaders: headers,
        })}\r\n`
      )
    } catch (e) {
      console.log(e)
    }
  }
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

interface CustomResponse extends Omit<Response, 'end'> {
  end: (data: any, encoding: string) => void
}

export default (req: Request, res: CustomResponse, next: NextFunction) => {
  const origEnd = res.end
  const startTime = Date.now()

  res.end = (chunk: any, encoding: string): void => {
    res.end = origEnd

    const endTime = Date.now()
    const responseBody = chunk.toString('utf8')
    const diffInSeconds = moment
      .duration(moment(startTime).diff(moment(endTime)))
      .asSeconds()

    new Logger(req, {
      StartTime: moment(startTime),
      EndTime: moment(endTime),
      ResponseBody: responseBody,
      TimeLapse: diffInSeconds,
    }).log()

    res.end(chunk, encoding)
  }

  next()
}
