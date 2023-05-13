import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { verifyToken as verifyTokenHelper } from '../helpers/JWT'
import { AuthException, ModelException } from '../utils/ErrorException'
import * as UserRepository from '../repositories/UserRepository'
import jwt from 'jsonwebtoken'
import moment from 'moment'

export const login = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array())
  }

  const email = req.body.email

  return UserRepository.findByEmail(email)
    .then((user) => {
      if (!user) {
        throw new ModelException('Records not found.', 'User')
      }

      if (user.authenticate(req.body.password, req.body.tkid)) {
        const token = user.sign()
        const decoded = jwt.decode(token, { complete: true })?.payload

        return res.status(200).send({
          message: 'successfully logged in',
          token,
          expiration: moment(decoded?.exp * 1000).format('YYYY-MM-DD h:mm:ss'),
        })
      }

      return res
        .status(400)
        .send({ message: 'Email or password is incorrect.' })
    })
    .catch(next)
}

export const verifyToken = ({ params }: Request, res: Response) => {
  const { token } = params
  const { errors } = verifyTokenHelper({ token })

  if (errors) {
    // throw exception
    throw new AuthException('Unauthorized')
  }

  // success
  return res.status(200).send()
}

export function create(req: Request, res: Response, next: NextFunction) {
  const payload = req.body

  UserRepository.createUser(payload)
    .then((result) => {
      return res.status(201).send({
        message: 'User has been created.',
        user: result?.transform([
          'firstName',
          'lastName',
          'email',
          'userId',
          'username',
          'createdAt',
          'updatedAt',
          'deletedAt',
        ]),
      })
    })
    .catch(next)
}
