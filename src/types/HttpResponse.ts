import { Response } from 'express'
import { Json } from 'sequelize/types/utils'

export interface JsonResponse {
  message: string
  data: any
  errors?: { [key: string]: any }
  code: number
}

type Send<T = Response> = (body?: JsonResponse) => T

export interface HttpResponse extends Response {
  json: Send<this>
}
