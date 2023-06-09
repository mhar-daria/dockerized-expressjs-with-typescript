import { DestroyOptions } from 'sequelize'
import GroupRole, { GroupRoleInput, GroupRoleOutput } from '../models/GroupRole'
import { Options } from '../types/sequelize'

export const find = (
  id: number,
  options: Options = {}
): Promise<GroupRoleOutput | null> => {
  return GroupRole.findByPk(id, options)
}

export const findByKey = (
  key: string,
  options: Options = {}
): Promise<GroupRoleOutput | null> => {
  return GroupRole.findOne({ where: { key }, ...options })
}

export const all = (
  options: Options = {}
): Promise<GroupRoleOutput[] | null> => {
  return GroupRole.findAll({
    attributes: ['groupRoleId', 'roles', 'name', 'key'],
  })
}

export const destroy = (options: DestroyOptions): Promise<number> => {
  return GroupRole.destroy(options)
}

export default {
  find,
  all,
  findByKey,
  destroy,
}
