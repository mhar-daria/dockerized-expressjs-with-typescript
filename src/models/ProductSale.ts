import { Optional, Model, DataTypes } from 'sequelize'
import connection from '.'
import _ from 'lodash'
import Client from './Client'
import Product from './Product'
import Sale from './Sale'

export interface ProductSaleAttributes {
  productSaleId: number
  saleId: number
  productId: number
  discount?: string | null
  quantity: number
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface ProductSaleInput
  extends Optional<ProductSaleAttributes, 'productSaleId'> {}

export interface ProductSaleOutput extends Required<ProductSaleAttributes> {}

class ProductSale
  extends Model<ProductSaleAttributes, ProductSaleInput>
  implements ProductSaleAttributes
{
  public productSaleId!: number
  public saleId!: number
  public productId!: number
  public quantity!: number
  public discount!: string
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

  public transform(options: string[] = []): Partial<ProductSaleAttributes> {
    if (_.isEmpty(options)) {
      return this.dataValues
    }

    return _.pick(this.dataValues, options)
  }
}

ProductSale.init(
  {
    productSaleId: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    saleId: {
      type: DataTypes.BIGINT,
      references: {
        model: {
          tableName: 'Sales',
        },
        key: 'saleId',
      },
      onDelete: 'cascade',
    },
    productId: {
      type: DataTypes.SMALLINT,
      references: {
        model: {
          tableName: 'Products',
        },
        key: 'productId',
      },
      onDelete: 'cascade',
    },
    discount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize: connection,
    modelName: 'ProductSale',
    timestamps: true,
    paranoid: true,
    defaultScope: {},
  }
)

ProductSale.belongsTo(Product, {
  foreignKey: 'productId',
  targetKey: 'productId',
  as: 'product',
})

ProductSale.belongsTo(Sale, {
  foreignKey: 'saleId',
  targetKey: 'saleId',
  as: 'sale',
})

export default ProductSale
