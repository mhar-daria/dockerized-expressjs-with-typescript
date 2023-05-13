import { ErrorRequestHandler } from 'express'

export type errorHandlerParams = {
  code?: number
  payload?: object | null
}

export type ErrorExceptions = ErrorRequestHandler & {
  code?: number
  message?: any
  response?: object
  model?: string
}

export type ErrorHandlerOutput = {
  message?: string
  data?: any
  code?: number
  errors?: any
}
