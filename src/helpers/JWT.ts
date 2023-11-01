import { Request } from 'express'
import JWT from 'jsonwebtoken'
import { JWT_LEEWAY, JWT_SECRET, JWT_EXPIRATION } from '../../config/jwt'
import { verifyTokenParams, verifyTokenResponse } from '../types/JWT'
import passport from 'passport'
import { Strategy } from 'passport-http-bearer'
import { isEmpty } from 'lodash'
import UserRepository from '../repositories/UserRepository'
import UserRole from '../models/UserRole'
import GroupRole from '../models/GroupRole'
import moment from 'moment'

export function sign(payload: any) {
  const date = new Date()
  return JWT.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  })
}

export function verifyToken({ token }: verifyTokenParams): verifyTokenResponse {
  let response: verifyTokenResponse = {}

  JWT.verify(token, JWT_SECRET, (errors: any, decoded: any) => {
    response = { errors, decoded }
  })

  return response
}

passport.use(
  new Strategy(
    { passReqToCallback: true },
    async (req: Request, token: string, done: Function) => {
      const { decoded = {} } = verifyToken({ token })
      if (isEmpty(decoded)) done(null, false)

      const user = await UserRepository.find(decoded.data.userId, {
        include: [
          {
            model: UserRole,
            as: 'role',
          },
          {
            model: GroupRole,
            as: 'groupRoles',
          },
        ],
      })

      done(null, user, { scope: 'all' })
    }
  )
)

export function authBearer() {
  return passport.authenticate('bearer', {
    session: false,
    failWithError: true,
  })
}
