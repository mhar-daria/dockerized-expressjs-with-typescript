import * as _ from 'lodash'
import { Request, Response } from 'express'
import { HttpResponse } from '../../../types/HttpResponse'
import { ProductInput, ProductOutput } from '../../../models/Product'
import ProductRepository from '../../../repositories/ProductRepository'
import { SaleInput, SaleOutput } from '../../../models/Sale'
import SaleRepository, {
  SaleInputType,
} from '../../../repositories/SaleRepository'

async function getProducts(req: Request, res: Response): Promise<HttpResponse> {
  const products: ProductOutput[] = await ProductRepository.all()

  return res.status(200).send({
    message: 'Product List',
    data: products,
  })
}

/**
 * Create Sale
 *
 * @param req Request
 * @param res Response
 * @returns Promise<HttpRespose>
 */
async function createSale(req: Request, res: Response): Promise<HttpResponse> {
  const payload = req.body as SaleInputType
  const sale: SaleOutput | null = await SaleRepository.create(payload, req)

  if (sale === null) {
    return res.status(400).send({
      message: 'Unable to save. Please try again later.',
      data: {},
    })
  }

  return res.status(200).send({
    message: 'Sale created',
    data: sale,
  })
}

/**
 * Get Product
 *
 * @param req Request
 * @param res Response
 * @returns Promise<HttpResponse>
 */
async function getProduct(req: Request, res: Response): Promise<HttpResponse> {
  const productId = +req.params.productId

  const product: ProductOutput | null = await ProductRepository.find(
    productId,
    {
      include: ['productLogs'],
    }
  )

  if (_.isEmpty(product)) {
    return res.status(400).send({
      message: 'Product does not exists',
      datat: {},
    })
  }

  return res.status(200).send({
    message: 'Product details',
    data: product,
  })
}

async function deleteProduct(
  req: Request,
  res: Response
): Promise<HttpResponse> {
  const productId: number = +req.params.productId
  const deleted: number | null = await ProductRepository.deleteById(productId)

  if (!deleted) {
    return res.status(400).send({
      message:
        'Product does not exists or something went wrong while deleting the product.',
      data: {},
    })
  }

  return res.status(200).send({
    message: 'Product has been deleted',
    data: {},
  })
}

export default {
  getProducts,
  createSale,
  getProduct,
  deleteProduct,
}
