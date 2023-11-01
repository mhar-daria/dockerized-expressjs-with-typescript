import { FindOptions } from 'sequelize'
import _ from 'lodash'
import { ProductInput } from '../models/Product'
import ProductSale, {
  ProductSaleAttributes,
  ProductSaleOutput,
} from '../models/ProductSale'

interface ProductSaleRepositoryInterface {
  find(
    id: number,
    options?: Omit<FindOptions<ProductSaleAttributes>, 'where'> | undefined
  ): Promise<ProductSaleOutput | null>

  deleteById(id: number): Promise<number | null>
}

type ProducSaletInputType = Array<{
  discount?: string
  quantity: number
  //   saleId: number
  productId: number
}>

type ProducSaleCreateType = Array<{
  discount?: string
  quantity: number
  saleId: number
  productId: number
}>

class ProductSaleRepository implements ProductSaleRepositoryInterface {
  /**
   * Get sale details using id
   *
   * @param id number
   * @param options object
   * @returns Promise<ProductSaleOutput|null>
   */
  public find(
    id: number,
    options: Omit<FindOptions<ProductSaleAttributes>, 'where'> | undefined = {}
  ): Promise<ProductSaleOutput | null> {
    return ProductSale.findByPk(id, options)
  }

  /**
   * Delete Sales
   *
   * @param id number
   * @returns Promise<number|null>
   */
  public async deleteById(id: number): Promise<number | null> {
    return ProductSale.destroy({
      where: {
        saleId: id,
      },
      cascade: true,
      hooks: true,
    })
  }

  /**
   * Create Sale
   */
  //     public async create(paylaod: SaleInput): Promise<ProductSaleOutput | null> {
  //         const sale =
  //   }

  /**
   * Bulk Create
   */
  public async bulkCreate(
    saleId: number,
    products: ProducSaletInputType,
    options: Omit<FindOptions<ProductSaleAttributes>, 'where'> = {}
  ) {
    const records: ProducSaleCreateType = []

    products.map((p) =>
      records.push({
        productId: p.productId,
        saleId: saleId,
        quantity: p.quantity,
        discount: p.discount,
      })
    )

    return await ProductSale.bulkCreate(records, options)
  }
}

export default new ProductSaleRepository()
