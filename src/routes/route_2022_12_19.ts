import express, { Request, Response } from 'express'
import Controllers from './../controllers/2022_12_19'
import { authBearer } from '../helpers/JWT'
import ValidatorMiddleware from '../middlewares/ValidatorMiddleware'
import CreateUserValidaiton from '../validations/users/CreateUserValidaiton'
import RbacMiddleware from '../middlewares/RbacMiddleware'
import CreateProductValidation from '../validations/products/CreateProductValidation'
import RouteProvider from '../providers/RouteProvider'
import CreateSaleValidation from '../validations/sales/CreateSaleValidation'
import serializeProducts from '../middlewares/serializers/SerializeProducts'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  return res.status(200).send({ message: 'Welcome to new page' })
})

RouteProvider(router)

/**
 * Users
 */
router
  .route('/users')
  .post(
    authBearer(),
    RbacMiddleware('create users'),
    ValidatorMiddleware(CreateUserValidaiton),
    Controllers.users.createUser
  )
router.get(
  '/users/:userId',
  authBearer(),
  RbacMiddleware('get user details'),
  Controllers.users.getUser
)
router.delete(
  '/users/:userId',
  authBearer(),
  RbacMiddleware('delete users'),
  Controllers.users.deleteUser
)

// RouteProvider(router)

/**
 * Categories
 */
router.get('/categories', authBearer(), Controllers.categories.getCategories)

/**
 * Products
 */
router.get('/products', authBearer(), Controllers.products.getProducts)
router.get(
  '/products/:productId',
  authBearer(),
  Controllers.products.getProduct
)
router.post(
  '/products',
  authBearer(),
  ValidatorMiddleware(CreateProductValidation),
  Controllers.products.createProduct
)
router.delete(
  '/products/:productId',
  authBearer(),
  Controllers.products.deleteProduct
)

/**
 * Sales
 */
router.post(
  '/sales',
  authBearer(),
  serializeProducts(),
  ValidatorMiddleware(CreateSaleValidation),
  Controllers.sales.createSale
)

export default router
