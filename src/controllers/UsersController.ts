import { NextFunction, Request, Response } from 'express'
import { verifyToken as verifyTokenHelper } from '../helpers/JWT'
import { AuthException } from '../utils/ErrorException'
import UserRepository from '../repositories/UserRepository'
import jwt, { JwtPayload } from 'jsonwebtoken'
import moment from 'moment'
import { unixTimestamp } from '../helpers/common'

export const login = (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email

  return UserRepository.findByEmail(email, true)
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .send({ message: 'Email or password is incorrect.' })
      }

      if (user.authenticate(req.body.password, req.body.tkid)) {
        const token = user.sign()
        const decoded = jwt.decode(token, { complete: true }) as JwtPayload

        return res.status(200).send({
          message: 'successfully logged in',
          token,
          expiration: moment(decoded?.exp ?? unixTimestamp() * 1000).format(
            'YYYY-MM-DD h:mm:ss'
          ),
          tokenType: 'bearer',
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
