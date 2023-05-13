import { Optional, Model, DataTypes } from 'sequelize'
import connection from '.'
import _ from 'lodash'
import User from './User'

interface GroupRoleAttributes {
  roles: object
  groupRoleId: number
  name: string
  key: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface GroupRoleInput
  extends Optional<GroupRoleAttributes, 'groupRoleId'> {}

export interface GroupRoleOutput extends Required<GroupRoleAttributes> {}

class GroupRole
  extends Model<GroupRoleAttributes, GroupRoleInput>
  implements GroupRoleAttributes
{
  public roles!: object
  public groupRoleId!: number
  public key!: string
  public name!: string
  public parentId!: number
  public createdAt!: Date
  public updatedAt!: Date
  public deletedAt!: Date

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Model[]) {
    GroupRole.belongsToMany(User, {
      through: 'GroupUser',
      as: 'groupUsers',
      foreignKey: 'groupRoleId',
      otherKey: 'userId',
    })
  }

  public transform(options: string[] = []): Partial<GroupRoleAttributes> {
    if (_.isEmpty(options)) {
      return this.dataValues
    }

    return _.pick(this.dataValues, options)
  }
}

GroupRole.init(
  {
    groupRoleId: {
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
    roles: {
      type: DataTypes.JSONB,
    },
  },
  {
    sequelize: connection,
    modelName: 'GroupRole',
    timestamps: true,
    paranoid: true,
  }
)

export default GroupRole
