import { NextFunction, Request, Response } from 'express'
import { ErrorExceptions, ErrorHandlerOutput } from '../types/Helpers'
import {
  AuthException,
  ErrorException,
  ModelException,
} from '../utils/ErrorException'

export function errorHandler(
  err: ErrorExceptions,
  req: Request,
  res: Response,
  next: NextFunction
): Response {
  let response: ErrorHandlerOutput = {
    message: 'Something went wrong! Please try again later!',
    code: 500,
    data: [],
    errors: [],
  }

  if (err instanceof AuthException) {
    response = err.response
  }

  if (err instanceof ErrorException) {
    response = err.response
  }

  if (err instanceof ModelException) {
    response = err.response
  }

  if (err.name === 'AuthenticationError') {
    response = {
      message: err.message,
      code: 401,
    }
  }

  return res.status(response.code || 400).send({ ...response })
}
