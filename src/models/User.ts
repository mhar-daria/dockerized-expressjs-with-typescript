import {
  Optional,
  Model,
  DataTypes,
  HasManyAddAssociationMixin,
} from 'sequelize'
import connection from '.'
import _ from 'lodash'
import { authenticate } from '../helpers/auth'
import { sign } from '../helpers/JWT'
import UserRole, { UserRoleOutput } from './UserRole'
import GroupRole, { GroupRoleOutput } from './GroupRole'
import GroupUser from './GroupUser'
import { generatePassword, mergeCustomizer } from '../helpers/common'
import { random } from '../helpers/common'

interface UserAttributes {
  userId: number
  firstName: string
  lastName: string
  username: string
  password: string
  email: string
  salt: string
  groupRoles?: GroupRoleOutput[]
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface UserInput extends Optional<UserAttributes, 'userId'> {}

export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public userId!: number
  public firstName!: string
  public lastName!: string
  public username!: string
  public email!: string
  public password!: string
  public salt!: string
  public createdAt!: Date
  public updatedAt!: Date
  public deletedAt!: Date
  public role!: UserRoleOutput
  public groupRoles!: GroupRoleOutput[]

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Model[]) {
    // define association here
  }

  public authenticate(rawPassword: string, nonce: string): boolean {
    return authenticate(rawPassword, nonce, this)
  }

  public addGroupRoles!: HasManyAddAssociationMixin<GroupRole, number>

  /**
   * JWT Sign
   *
   * @returns string
   */
  public sign(): string {
    return sign(this.dataValues)
  }

  public get permissions(): { [key: string]: string[] } {
    const groupPermissions = this.groupRoles

    let permissions: { [key: string]: string[] } = {}

    if (!_.isEmpty(groupPermissions)) {
      _.map(groupPermissions, (v) =>
        _.mergeWith(permissions, v?.roles || {}, mergeCustomizer)
      )
    }

    if (!_.isEmpty(this.role?.roles)) {
      _.mergeWith(permissions, this.role?.roles, mergeCustomizer)
    }

    return permissions
  }

  public transform(options: string[] = []): Partial<UserAttributes> {
    if (_.isEmpty(options)) {
      return this.dataValues
    }

    return _.pick(this.dataValues, options)
  }
}

User.init(
  {
    userId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    modelName: 'User',
    timestamps: true,
    paranoid: true,
  }
)

User.beforeCreate(async (user: User) => {
  user.firstName = _.capitalize(user.firstName)
  user.lastName = _.capitalize(user.lastName)

  const usernameRand = random(10)
  const { salt, password } = generatePassword(user.password)

  user.salt = salt
  user.password = password
  user.username = `${user.email?.split('@').shift() || ''}-${usernameRand}`
})

User.hasOne(UserRole, {
  as: 'role',
  sourceKey: 'userId',
  foreignKey: 'userId',
})

User.belongsToMany(GroupRole, {
  through: 'GroupUsers',
  as: 'groupRoles',
  foreignKey: 'userId',
  otherKey: 'groupRoleId',
})

export default User
