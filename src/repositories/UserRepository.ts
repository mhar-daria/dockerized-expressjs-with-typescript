import sha256 from 'crypto-js/sha256'
import { random } from '../helpers/common'
import User, { UserInput, UserOutput } from '../models/User'
import { Options } from '../types/sequelize'
import { FindOptions } from 'sequelize'

export const find = (
  id: number,
  options: FindOptions = {}
): Promise<UserOutput | null> => {
  return User.findByPk(id, options)
}

export const findByEmail = (email: string): Promise<User | null> => {
  return User.findOne({
    where: {
      email,
    },
  })
}

export const createUser = (payload: UserInput): Promise<User | null> => {
  const salt = random(20)
  const hashedPassword = sha256(`${payload.password}.${salt}`).toString()
  const usernameRand = random(10)
  const username = `${payload.email?.split('@').shift() || ''}-${usernameRand}`

  payload = { ...payload, salt, password: hashedPassword, username }
  return User.create(payload)
}
