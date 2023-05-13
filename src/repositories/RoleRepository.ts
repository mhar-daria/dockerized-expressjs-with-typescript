import Role, { RoleOutput } from '../models/Role'
import { Options } from '../types/sequelize'

export const find = (
  id: number,
  options: Options = {}
): Promise<RoleOutput | null> => {
  return Role.findByPk(id, options)
}

export const all = (options: Options = {}): Promise<RoleOutput[] | null> => {
  return Role.findAll({
    attributes: ['roleId', 'name', 'key'],
    include: [
      {
        model: Role,
        as: 'children',
        required: true,
        attributes: ['roleId', 'name', 'key', 'parentId'],
      },
    ],
  })
}
