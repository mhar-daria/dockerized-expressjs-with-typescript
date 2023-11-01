import { FindOptions, Options, QueryOptions } from 'sequelize'
import _ from 'lodash'
import ProductLog, {
  ProductLogAttributes,
  ProductLogInput,
  ProductLogOutput,
} from '../models/ProductLog'

interface ProductLogRepositoryInterface {
  find(
    id: number,
    options?: Omit<FindOptions<ProductLogAttributes>, 'where'> | undefined
  ): Promise<ProductLogOutput | null>

  deleteById(id: number): Promise<number | null>
}

class ProductLogRepository implements ProductLogRepositoryInterface {
  /**
   * Get product log details using id
   *
   * @param id number
   * @param options object
   * @returns Promise<ProductLogOutput|null>
   */
  public find(
    id: number,
    options: Omit<FindOptions<ProductLogAttributes>, 'where'> | undefined = {}
  ): Promise<ProductLogOutput | null> {
    return ProductLog.findByPk(id, options)
  }

  /**
   * Delete Product Log
   *
   * @param id number
   * @returns Promise<number|null>
   */
  public async deleteById(id: number): Promise<number | null> {
    return ProductLog.destroy({
      where: {
        productLogId: id,
      },
      cascade: true,
      hooks: true,
    })
  }

  /**
   * Delete by foreign key
   *
   * @param productId number
   *
   * @returns Promise<number|null>
   */
  public async deleteByProductId(productId: number): Promise<number | null> {
    return ProductLog.destroy({
      where: {
        productId,
      },
    })
  }

  /**
   * Crate Product Logs
   *
   * @param payload ProductLogInput
   *
   * @return <Promise<ProductLogOutput|null>
   */
  public async create(
    paylaod: ProductLogInput,
    options?: QueryOptions
  ): Promise<ProductLogOutput | null> {
    return ProductLog.create(paylaod, options)
  }
}

export default new ProductLogRepository()
