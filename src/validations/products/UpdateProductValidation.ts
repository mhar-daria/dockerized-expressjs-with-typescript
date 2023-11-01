import { checkSchema } from 'express-validator'
import * as _ from 'lodash'
import CategoryRepository from '../../repositories/CategoryRepository'
import ProductRepository from '../../repositories/ProductRepository'

export default checkSchema(
  {
    productId: {
      in: ['params'],
      exists: {
        errorMessage: 'Product ID is required',
      },
      custom: {
        errorMessage: 'Selected product does not exists.',
        options: async (value) => {
          const product = await ProductRepository.find(value)
        },
      },
    },
    name: {
      exists: {
        errorMessage: 'Prodcut Name is required.',
      },
      custom: {
        errorMessage: 'Product name already exists.',
        options: async (value) => {
          const product = await ProductRepository.findByName(value)
        },
      },
    },
    quantity: {
      exists: {
        errorMessage: 'Quantity is required',
      },
      isNumeric: {
        errorMessage: 'Quantity should be a number',
      },
    },
    price: {
      exists: {
        errorMessage: 'Price is required',
      },
      isNumeric: {
        errorMessage: 'Price should be a number',
      },
    },
    discount: {
      isNumeric: {
        errorMessage: 'Discount should be a number',
      },
    },
    categoryId: {
      exists: {
        errorMessage: 'Category ID is required',
      },
      custom: {
        errorMessage: 'Category does not exists',
        options: async (value, { req, location, path }) => {
          const category = await CategoryRepository.find(value)

          if (!category) {
            return Promise.reject('Category does not existss')
          }
        },
      },
    },
  },
  ['body']
)
