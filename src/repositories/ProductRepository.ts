import { FindOptions, Op, Optional, UpdateOptions } from 'sequelize'
import _ from 'lodash'
import Product, {
  ProductAttributes,
  ProductInput,
  ProductOutput,
} from '../models/Product'
import Category, { CategoryAttributes } from '../models/Category'
import ProductLog, { ProductLogInput } from '../models/ProductLog'
import Sequelize from '../models'
import { NullishPropertiesOf } from 'sequelize/types/utils'
import ProductLogRepository from './ProductLogRepository'

interface ProductRepositoryInterface {
  find(
    id: number,
    options?: Omit<FindOptions<ProductAttributes>, 'where'> | undefined
  ): Promise<ProductOutput | null>

  deleteById(id: number): Promise<number | null>
}

class ProductRepository implements ProductRepositoryInterface {
  /**
   * Get product details using id
   *
   * @param id number
   * @param options object
   * @returns Promise<ProductOutput|null>
   */
  public find(
    id: number,
    options: Omit<FindOptions<ProductAttributes>, 'where'> | undefined = {}
  ): Promise<ProductOutput | null> {
    return Product.findByPk(id, options)
  }

  /**
   * Delete Product
   *
   * @param id number
   * @returns Promise<number|null>
   */
  public async deleteById(id: number): Promise<number | null> {
    return Product.destroy({
      where: {
        productId: id,
      },
      cascade: true,
      hooks: true,
    })
  }

  /**
   * All Product
   *
   * @param options
   * @returns
   */
  public async all(
    options: Partial<FindOptions<ProductAttributes>> | undefined = {}
  ): Promise<ProductOutput[]> {
    const newOptions = {
      ...options,
      attributes: [
        'productId',
        'name',
        'stocks',
        'price',
        'createdAt',
        'updatedAt',
      ],
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['categoryId', 'name', 'description'],
        },
        {
          model: ProductLog,
          as: 'productLogs',
          attributes: [
            'productLogId',
            'supplier',
            'contact',
            'price',
            'discount',
            'createdAt',
          ],
        },
      ],
    }

    return Product.findAll(newOptions)
  }

  public async findByName(name: string): Promise<Product | null> {
    return Product.findOne({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    })
  }

  /**
   * Create new product
   *
   * @param payload: any
   *
   * @return ProductOutput
   */
  public async create(
    payload: Omit<
      ProductInput & { quantity: number },
      NullishPropertiesOf<ProductInput & { quantity: number }>
    >
  ): Promise<ProductOutput | null> {
    const transaction = await Sequelize.transaction()

    try {
      const _product = await this.findByName(payload['name'])

      payload['stocks'] = payload['quantity']

      if (!_.isEmpty(_product)) {
        // when product is present
        // add the new and old quantity
        payload['stocks'] = _product.stocks + payload['quantity']
      }

      const [product] = await Product.upsert(payload, {
        conflictFields: ['name'],
        transaction,
      })

      const logPayload: ProductLogInput = _.pick(payload, [
        'price',
        'quantity',
        'discount',
        'supplier',
        'contact',
      ]) as ProductLogInput

      await product.addProductLogs(logPayload, { transaction })

      await transaction.commit()

      return product
    } catch (err) {
      await transaction.rollback()

      return null
    }
  }

  public async update(
    payload: Partial<ProductInput>,
    options: UpdateOptions
  ): Promise<boolean> {
    const [count] = await Product.update(payload, options)

    return !!count
  }
}

export default new ProductRepository()
