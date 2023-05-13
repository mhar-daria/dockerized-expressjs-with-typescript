import GroupRole, { GroupRoleInput, GroupRoleOutput } from '../models/GroupRole'
import { Options } from '../types/sequelize'

export const find = (
  id: number,
  options: Options = {}
): Promise<GroupRoleOutput | null> => {
  return GroupRole.findByPk(id, options)
}

export const all = (
  options: Options = {}
): Promise<GroupRoleOutput[] | null> => {
  return GroupRole.findAll({
    attributes: ['groupRoleId', 'roles', 'name', 'key'],
  })
}
