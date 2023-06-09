import express, { Request, Response } from 'express'
import Controllers from './../controllers/2022_12_19'
import { authBearer } from '../helpers/JWT'
import ValidatorMiddleware from '../middlewares/ValidatorMiddleware'
import CreateUserValidaiton from '../validations/users/CreateUserValidaiton'
import RbacMiddleware from '../middlewares/RbacMiddleware'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  return res.status(200).send({ message: 'Welcome to new page' })
})

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

export default router
