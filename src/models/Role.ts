import { Optional, Model, DataTypes } from 'sequelize'
import connection from '.'
import _ from 'lodash'
import { authenticate } from '../helpers/auth'
import { sign } from '../helpers/JWT'

interface RoleAttributes {
  roleId: number
  key: string
  name: string
  parentId: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface RoleInput extends Optional<RoleAttributes, 'roleId'> {}

export interface RoleOutput extends Required<RoleAttributes> {}

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  public roleId!: number
  public name!: string
  public key!: string
  public parentId!: number
  public createdAt!: Date
  public updatedAt!: Date
  public deletedAt!: Date

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Model[]) {}

  public transform(options: string[] = []): Partial<RoleAttributes> {
    if (_.isEmpty(options)) {
      return this.dataValues
    }

    return _.pick(this.dataValues, options)
  }
}

Role.init(
  {
    roleId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    key: {
      type: DataTypes.STRING,
    },
    parentId: {
      defaultValue: null,
      type: DataTypes.SMALLINT,
    },
  },
  {
    sequelize: connection,
    modelName: 'Role',
    timestamps: true,
    paranoid: true,
  }
)

Role.hasMany(Role, {
  foreignKey: 'parentId',
  sourceKey: 'roleId',
  as: 'children',
})

export default Role
