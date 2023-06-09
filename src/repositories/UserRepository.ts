import User, { UserAttributes, UserInput, UserOutput } from '../models/User'
import { FindOptions } from 'sequelize'
import GroupRroleRepository from './GroupRroleRepository'
import Sequelize from '../models'
import _ from 'lodash'

interface UserRepositoryInterface {
  find(
    id: number,
    options?: Omit<FindOptions<UserAttributes>, 'where'> | undefined
  ): Promise<UserOutput | null>

  findByEmail(email: string, returnAll: boolean): Promise<User | null> | null

  createUser(payload: UserInput): Promise<User | null>
}

class UserRepository implements UserRepositoryInterface {
  /**
   * Get user details using id
   *
   * @param id number
   * @param options object
   * @returns object
   */
  public find(
    id: number,
    options: Omit<FindOptions<UserAttributes>, 'where'> | undefined = {}
  ): Promise<UserOutput | null> {
    return User.findByPk(id, options)
  }

  /**
   * Get user details using email
   *
   * @param email string
   * @returns User
   */
  public findByEmail(
    email: string,
    returnAll: boolean = false
  ): Promise<User | null> {
    let attributes: { [key: string]: any } = {
      where: {
        email,
      },
    }

    if (returnAll === true) {
      attributes['attributes'] = { include: ['password', 'salt'] }
    }
    return User.findOne(attributes)
  }

  public async deleteUserById(id: number): Promise<number | null> {
    return User.destroy({
      where: {
        userId: id,
      },
      cascade: true,
      hooks: true,
    })
  }

  /**
   * Create user
   *
   * @param payload UserInput
   * @returns UserOutput | null
   */
  public async createUser(payload: UserInput): Promise<User | null> {
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
}

export default new UserRepository()
