import { Request, Response } from 'express'
import JWT, { JsonWebTokenError, JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { JWT_LEEWAY, JWT_SECRET, JWT_EXPIRATION } from '../../config/JWT'
import { verifyTokenParams, verifyTokenResponse } from '../types/JWT'
import passport from 'passport'
import bearerStrategy from 'passport-http-bearer'
import { isEmpty } from 'lodash'
import UserRepository from '../repositories/UserRepository'
import { decode } from 'punycode'
import UserRole from '../models/UserRole'
import Role from '../models/Role'
import GroupRole from '../models/GroupRole'

export function sign(payload: any) {
  const date = new Date()
  return JWT.sign(
    {
      data: payload || {},
      iat: Math.floor(Date.now() / 1000) - JWT_LEEWAY,
      date,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRATION,
    }
  )
}

export function verifyToken({ token }: verifyTokenParams): verifyTokenResponse {
  let response: verifyTokenResponse = {}

  JWT.verify(token, JWT_SECRET, (errors: any, decoded: any) => {
    response = { errors, decoded }
  })

  return response
}

passport.use(
  new bearerStrategy(
    { passReqToCallback: true },
    async (req: Request, token: string, done: Function) => {
      const { decoded } = verifyToken({ token })
      if (isEmpty(decoded)) return done(null, false)

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

      return done(null, user, { scope: 'all' })
    }
  )
)

export function authBearer() {
  return passport.authenticate('bearer', {
    session: false,
    failWithError: true,
  })
}
