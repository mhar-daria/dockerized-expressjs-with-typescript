import { Optional, Model, DataTypes, QueryOptions } from 'sequelize'
import connection from '.'
import _ from 'lodash'
import Category from './Category'
import ProductLog, { ProductLogInput, ProductLogOutput } from './ProductLog'
import ProductLogRepository from '../repositories/ProductLogRepository'

export interface ProductAttributes {
  productId: number
  stocks: number
  price: string
  name: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date | null
}

export interface ProductInput
  extends Optional<ProductAttributes, 'productId'> {}

export interface ProductOutput extends Required<ProductAttributes> {}

class Product
  extends Model<ProductAttributes, ProductInput>
  implements ProductAttributes
{
  public productId!: number
  public stocks!: number
  public price!: string
  public name!: string
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

  public transform(options: string[] = []): Partial<ProductAttributes> {
    if (_.isEmpty(options)) {
      return this.dataValues
    }

    return _.pick(this.dataValues, options)
  }

  public addProductLogs(
    log: ProductLogInput,
    options?: QueryOptions
  ): Promise<ProductLogOutput | null> {
    log.productId = this.productId

    return ProductLogRepository.create(log, options)
  }
}

Product.init(
  {
    productId: {
      type: DataTypes.SMALLINT,
      autoIncrement: true,
      primaryKey: true,
    },
    stocks: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    modelName: 'Product',
    timestamps: true,
    paranoid: true,
    defaultScope: {},
  }
)

Product.beforeDestroy(async (product: Product) => {
  await ProductLogRepository.deleteByProductId(product.productId)
})

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  targetKey: 'categoryId',
  as: 'category',
})

Product.hasMany(ProductLog, {
  foreignKey: 'productId',
  sourceKey: 'productId',
  as: 'productLogs',
})

export default Product
