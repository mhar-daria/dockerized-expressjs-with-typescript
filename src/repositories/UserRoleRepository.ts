import UserRole, { UserRoleOutput } from '../models/UserRole'
import { Options } from '../types/sequelize'

export const find = (
  id: number,
  options: Options = {}
): Promise<UserRoleOutput | null> => {
  return UserRole.findByPk(id, options)
}

export const all = (
  options: Options Findoptions = {}
): Promise<UserRoleOutput[] | null> => {
  return UserRole.findAll({
    attributes: ['userRoleId', 'userId', 'roles'],
  })
}
