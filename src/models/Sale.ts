import { Optional, Model, DataTypes } from 'sequelize'
import connection from '.'
import _ from 'lodash'
import Client from './Client'
import Product from './Product'

export interface SaleAttributes {
  saleId: number
  clientId: number
  dueDate: Date | null
  notes?: string | null
  status: 'reserved' | 'pending' | 'design' | 'processed' | 'delivered'
  payment: 'paid' | 'downpayment' | 'cod'
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface SaleInput extends Optional<SaleAttributes, 'saleId'> {}

export interface SaleOutput extends Required<SaleAttributes> {}

class Sale extends Model<SaleAttributes, SaleInput> implements SaleAttributes {
  public saleId!: number
  public clientId!: number
  public dueDate!: Date | null
  public notes!: string
  public status!: 'reserved' | 'pending' | 'design' | 'processed' | 'delivered'
  public payment!: 'paid' | 'downpayment' | 'cod'
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

  public transform(options: string[] = []): Partial<SaleAttributes> {
    if (_.isEmpty(options)) {
      return this.dataValues
    }

    return _.pick(this.dataValues, options)
  }
}

Sale.init(
  {
    saleId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    clientId: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: {
          tableName: 'Clients',
        },
        key: 'clientId',
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: 'pending',
      values: ['reserved', 'pending', 'design', 'processed', 'delivered'],
    },
    payment: {
      type: DataTypes.ENUM,
      defaultValue: 'downpayment',
      values: ['paid', 'downpayment', 'cod'],
    },
  },
  {
    sequelize: connection,
    modelName: 'Sale',
    timestamps: true,
    paranoid: true,
    defaultScope: {},
  }
)

Sale.belongsTo(Client, {
  foreignKey: 'clientId',
  targetKey: 'clientId',
  as: 'client',
})

export default Sale
