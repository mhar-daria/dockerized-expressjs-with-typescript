import { NextFunction, Request, Response } from 'express'
import _ from 'lodash'
import Product, { ProductOutput } from '../../models/Product'
import { pid } from 'process'
import ProductRepository from '../../repositories/ProductRepository'

type ProductType = {
  [key: string]: ProductOutput | null
}

export default function () {
  return async (
    req: Request & { products?: ProductType },
    res: Response,
    next: NextFunction
  ) => {
    const productIds = _.map(req.body?.products, 'productId')

    if (!_.isEmpty(productIds)) {
      const products: ProductType = {}

      await Promise.all(
        productIds.map(async (pId) => {
          products[String(pId)] = await ProductRepository.find(pId)
        })
      )

      req.products = products
    } else {
      req.products = {}
    }

    next()
  }
}
