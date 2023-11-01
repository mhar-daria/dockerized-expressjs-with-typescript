import { FindOptions, Optional } from 'sequelize'
import _ from 'lodash'
import Sale, { SaleAttributes, SaleInput, SaleOutput } from '../models/Sale'
import Product, { ProductInput, ProductOutput } from '../models/Product'
import Sequelize from '../models'
import Client from '../models/Client'
import { Request } from 'express'
import ProductSaleRepository from './ProductSaleRepository'
import ProductRepository from './ProductRepository'

interface SaleRepositoryInterface {
  find(
    id: number,
    options?: Omit<FindOptions<SaleAttributes>, 'where'> | undefined
  ): Promise<SaleOutput | null>

  deleteById(id: number): Promise<number | null>
}

export type SaleInputType = SaleInput & {
  customer: {
    firstName: string
    lastName: string
    address?: string | null
  }
  dueDate: Date | null
  products: Array<
    Omit<ProductInput, 'stocks'> & {
      productId: number
      quantity: number
      discount?: string
    }
  >
}

class SaleRepository implements SaleRepositoryInterface {
  protected processablePayment: Array<string> = ['paid', 'downpayment']

  /**
   * Get sale details using id
   *
   * @param id number
   * @param options object
   * @returns Promise<SaleOutput|null>
   */
  public find(
    id: number,
    options: Omit<FindOptions<SaleAttributes>, 'where'> | undefined = {}
  ): Promise<SaleOutput | null> {
    return Sale.findByPk(id, options)
  }

  /**
   * Delete Sales
   *
   * @param id number
   * @returns Promise<number|null>
   */
  public async deleteById(id: number): Promise<number | null> {
    return Sale.destroy({
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
  public async create(
    paylaod: SaleInputType,
    req: Request & {
      products: Array<ProductOutput>
    }
  ): Promise<SaleOutput | null> {
    const transaction = await Sequelize.transaction()

    try {
      // create client
      const [client] = await Client.upsert(paylaod.customer, {
        conflictFields: ['firstName', 'lastName', 'address'],
        transaction,
      })

      const salePayload = {
        clientId: client.clientId,
        dueDate: paylaod.dueDate,
        notes: paylaod.notes,
        status: paylaod.status,
        payment: paylaod.payment,
      }

      // create sales
      const sale = await Sale.create(salePayload, {
        transaction,
      })

      paylaod.products?.map(async (product) => {
        let p: ProductOutput = req.products[product.productId] ?? {}
        let stocks = p.stocks - product.quantity
        await ProductRepository.update(
          { stocks },
          {
            where: {
              productId: product.productId,
            },
            transaction,
          }
        )
      })

      await ProductSaleRepository.bulkCreate(sale.saleId, paylaod.products, {
        transaction,
      })

      // commit all changes
      await transaction.commit()
      return sale
    } catch (e) {
      // roll back changes
      await transaction.rollback()
      return null
    }
  }

  /**
   * Bulk Create
   */
  public async bulkCreate(
    payload: SaleInput & {
      products: Pick<
        ProductInput & { discount: number; quantity: number },
        'productId' | 'quantity' | 'discount'
      >
    }
  ) {}
}

export default new SaleRepository()
