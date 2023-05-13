import { Optional, Model, DataTypes } from 'sequelize'
import connection from '.'
import _ from 'lodash'
import User from './User'
import GroupRole from './GroupRole'

interface GroupUserAttributes {
  groupUserId: number
  groupRoleId: number
  userId: number
  name: string
  key: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface GroupUserInput
  extends Optional<GroupUserAttributes, 'groupRoleId'> {}

export interface GroupUserOutput extends Required<GroupUserAttributes> {}

class GroupUser
  extends Model<GroupUserAttributes, GroupUserInput>
  implements GroupUserAttributes
{
  public groupUserId!: number
  public groupRoleId!: number
  public userId!: number
  public name!: string
  public key!: string
  public createdAt!: Date
  public updatedAt!: Date
  public deletedAt!: Date

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Model[]) {
    GroupUser.belongsTo(User, {
      targetKey: 'userId',
      foreignKey: 'userId',
    })
    GroupUser.belongsTo(GroupRole, {
      targetKey: 'groupRoleId',
      foreignKey: 'grouproleId',
    })
  }

  public transform(options: string[] = []): Partial<GroupUserAttributes> {
    if (_.isEmpty(options)) {
      return this.dataValues
    }

    return _.pick(this.dataValues, options)
  }
}

GroupUser.init(
  {
    groupUserId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    groupRoleId: {
      type: DataTypes.BIGINT,
    },
    name: {
      type: DataTypes.STRING,
    },
    key: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.BIGINT,
    },
  },
  {
    sequelize: connection,
    modelName: 'GroupUser',
    timestamps: true,
    paranoid: true,
  }
)

export default GroupUser
