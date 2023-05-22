import { Request, Response } from 'express'
import { HttpResponse } from '../../../types/HttpResponse'
import { generatePassword, random } from '../../../helpers/common'
import UserRepository from '../../../repositories/UserRepository'
import _ from 'lodash'
import { UserOutput } from '../../../models/User'

async function createUser(req: Request, res: Response): Promise<HttpResponse> {
  const payload = req.body

  const user: UserOutput | null = await UserRepository.createUser(payload)

  if (_.isEmpty(user)) {
    return res.sendStatus(400).send({
      message: 'Something went wrong. Please try again at a later time.',
      data: [],
      code: 400,
    })
  }
  return res.sendStatus(201).send()
}

function deleteUser(req: Request, res: Response): HttpResponse {
  const params = req.params

  return res.sendStatus(200).send({
    message: 'You have successfully deleted a user.',
    code: 200,
    data: params,
  })
}

export default {
  createUser,
  deleteUser,
}
