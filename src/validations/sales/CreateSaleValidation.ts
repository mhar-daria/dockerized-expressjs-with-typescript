import { checkSchema } from 'express-validator'
import moment from 'moment'
import _ from 'lodash'

export default checkSchema({
  dueDate: {
    exists: {
      errorMessage: 'Due Date is required.',
    },
    isAfter: {
      options: moment().format('YYYY-MM-DD'),
    },
  },
  'customer.firstName': {
    exists: {
      errorMessage: 'Customer First Name is required.',
    },
  },
  'customer.lastName': {
    exists: {
      errorMessage: 'Customer Last Name is required.',
    },
  },
  'customer.address': {
    exists: {
      errorMessage: 'Customer Address is reuqired.',
    },
  },
  products: {
    exists: {
      errorMessage: 'Products is required',
    },
    isArray: {
      errorMessage: 'Product should be an array.',
    },
  },
  'products.*.productId': {
    custom: {
      // errorMessage: 'Products does not existst',
      options: async (value, { req }) => {
        const product = req.products[String(value)] || null

        if (!product) {
          return Promise.reject('Product does not exists.')
        }
      },
    },
  },
  'products.*.quantity': {
    exists: {
      errorMessage: 'Quantity is required.',
    },
    custom: {
      options: async (value, { req, path }) => {
        let p = path.replace(/\.[^.]*$/, '')
        let bodyProduct = _.get(req.body, p)
        let product = req.products[bodyProduct.productId]

        if (!product) {
          return Promise.reject('Not enough stocks.')
        }

        if (product?.stocks < value) {
          return Promise.reject('Not enough stocks.')
        }
      },
    },
  },
  status: {
    exists: {
      errorMessage: 'Status is required.',
    },
    isIn: {
      options: [['reserved', 'pending', 'design', 'processed', 'delivered']],
      errorMessage: `Status not in the list of allowed status (${[
        'reserved',
        'pending',
        'design',
        'processed',
        'delivered',
      ]?.join(',')})`,
    },
  },
  payment: {
    exists: {
      errorMessage: 'Payment is required.',
    },
    isIn: {
      options: [['paid', 'downpayment', 'cod']],
      errorMessage: `Payment method is not in the list (${[
        'paid',
        'downpayment',
        'cod',
      ]?.join(',')})`,
    },
  },
})

// {
//     "customer": {
//         "firstName": "First Name",
//         "lastName": "Last Name",
//         "address": "",
//     },
//     "dueDate": "2023-02-21",
//     "products": [
//         {
//             "productId": "199",
//             "quantity": "10",
//             "discount": "",
//         }
//     ]
// }
