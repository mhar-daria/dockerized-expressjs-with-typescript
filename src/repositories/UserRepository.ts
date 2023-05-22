import sha256 from 'crypto-js/sha256'
import { random } from '../helpers/common'
import User, { UserInput, UserOutput } from '../models/User'
import { Options } from '../types/sequelize'
import { FindOptions } from 'sequelize'
import GroupRroleRepository from './GroupRroleRepository'
import Sequelize, { transaction } from '../models'
import _ from 'lodash'

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

/**
 *
 * @param payload UserInput
 * @returns UserOutput | null
 */
export const createUser = async (payload: UserInput): Promise<User | null> => {
  const t = await Sequelize.transaction()

  try {
    // use email as default password
    if (_.isEmpty(payload.password)) {
      payload.password = payload.email
    }

    const user = await User.create(payload, {
      transaction: t,
    })

    const groupRole = await GroupRroleRepository.findByKey('guest')
    await user.addGroupRoles(groupRole?.groupRoleId, { transaction: t })

    await t.commit()

    return user
  } catch (err) {
    await t.rollback()

    return null
  }
}

export default {
  createUser,
  find,
  findByEmail,
}
