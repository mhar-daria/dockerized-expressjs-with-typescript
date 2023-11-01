import { Optional, Model, DataTypes } from 'sequelize'
import connection from '.'
import _ from 'lodash'
import Sale from './Sale'

export interface ClientAttributes {
  clientId: number
  firstName: string
  lastName: string
  address?: string | null
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface ClientInput
  extends Optional<ClientAttributes, 'clientId' | 'address'> {}

export interface ClientOutput extends Required<ClientAttributes> {}

class Client
  extends Model<ClientAttributes, ClientInput>
  implements ClientAttributes
{
  public clientId!: number
  public firstName!: string
  public lastName!: string
  public address!: string
  public createdAt!: Date
  public updatedAt!: Date
  public deletedAt!: Date | null

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: Model[]) {
    // define association here
  }

  public transform(options: string[] = []): Partial<ClientAttributes> {
    if (_.isEmpty(options)) {
      return this.dataValues
    }

    return _.pick(this.dataValues, options)
  }
}

Client.init(
  {
    clientId: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: 'Client',
    timestamps: true,
    paranoid: true,
    defaultScope: {},
  }
)

// Client.hasMany(Sale, {
//   foreignKey: 'clientId',
//   sourceKey: 'clientId',
//   as: 'sales',
// })

export default Client
