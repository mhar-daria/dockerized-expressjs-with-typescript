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
    return res.status(400).send({
      message: 'Something went wrong. Please try again at a later time.',
      data: [],
      code: 400,
    })
  }
  return res.status(201).send()
}

async function deleteUser(req: Request, res: Response): Promise<HttpResponse> {
  const userId = parseInt(req.params.userId, 10)

  const deleted = await UserRepository.deleteUserById(userId)

  if (!deleted) {
    return res.status(400).send({
      message:
        'Unable to delete user. User is either not found or something went wrong while deleting the user.',
      code: 400,
      data: {},
    })
  }
  return res.status(200).send({
    message: 'You have successfully deleted a user.',
    code: 200,
    data: {},
  })
}

/**
 * Get User Details
 *
 * @param req Request
 * @param res Response
 * @returns object
 */
async function getUser(req: Request, res: Response): Promise<HttpResponse> {
  const userId: number = parseInt(req.params.userId, 10)

  const user: UserOutput | null = await UserRepository.find(userId)

  if (_.isEmpty(user)) {
    return res.status(400).send({
      message: 'Unable to find user. User might be deleted or inactive.',
      code: 400,
      data: {},
    })
  }

  return res.status(200).send({
    message: 'Successfully get user details',
    code: 200,
    data: user,
  })
}

export default {
  createUser,
  deleteUser,
  getUser,
}
