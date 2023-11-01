import { Optional, Model, DataTypes } from 'sequelize'
import connection from '.'
import _ from 'lodash'

export interface ProductLogAttributes {
  productLogId: number
  quantity: number
  price: string
  contact: string
  supplier: string
  productId: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface ProductLogInput
  extends Optional<ProductLogAttributes, 'productLogId'> {}

export interface ProductLogOutput extends Required<ProductLogAttributes> {}

class ProductLog
  extends Model<ProductLogAttributes, ProductLogInput>
  implements ProductLogAttributes
{
  public productLogId!: number
  public productId!: number
  public quantity!: number
  public price!: string
  public contact!: string
  public supplier!: string
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

  public transform(options: string[] = []): Partial<ProductLogAttributes> {
    if (_.isEmpty(options)) {
      return this.dataValues
    }

    return _.pick(this.dataValues, options)
  }
}

ProductLog.init(
  {
    productLogId: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: {
          tableName: 'Products',
        },
        key: 'productId',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplier: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: connection,
    modelName: 'ProductLog',
    timestamps: true,
    paranoid: true,
    defaultScope: {},
  }
)

export default ProductLog
