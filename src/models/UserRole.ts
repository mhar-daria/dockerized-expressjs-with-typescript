import { Optional, Model, DataTypes } from 'sequelize'
import connection from '.'
import _ from 'lodash'
import User from './User'

interface UserRoleAttributes {
  userRoleId: number
  userId: number
  roles: { [key: string]: string[] }
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface UserRoleInput
  extends Optional<UserRoleAttributes, 'userRoleId'> {}

export interface UserRoleOutput extends Required<UserRoleAttributes> {}

class UserRole
  extends Model<UserRoleAttributes, UserRoleInput>
  implements UserRoleAttributes
{
  public userId!: number
  public userRoleId!: number
  public roles!: object
  public createdAt!: Date
  public updatedAt!: Date
  public deletedAt!: Date

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Model[]) {}

  public transform(options: string[] = []): Partial<UserRoleAttributes> {
    if (_.isEmpty(options)) {
      return this.dataValues
    }

    return _.pick(this.dataValues, options)
  }
}

UserRole.init(
  {
    userRoleId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    roles: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: 'UserRole',
    timestamps: true,
    paranoid: true,
  }
)

// UserRole.hasMany(User, {
//   foreignKey: 'userId',
//   targetKey: 'userId',
// })

export default UserRole
