import {
  NextFunction,
  Request,
  RequestParamHandler,
  Response,
  Router,
} from 'express'
import UserRepository from '../repositories/UserRepository'
import ProductRepository from '../repositories/ProductRepository'

interface BindingInterface {
  name: string
  model: any
}

const bindings: BindingInterface[] = [
  {
    name: 'userId',
    model: UserRepository,
  },
  {
    name: 'productId',
    model: ProductRepository,
  },
]

interface RequestType extends Request {
  [key: string]: any
}

function handle(param: string, repository: any): RequestParamHandler {
  return async (
    req: RequestType,
    res: Response,
    next: NextFunction,
    id: number
  ) => {
    const _model = await repository.find(id)

    req[param] = _model

    next()
  }
}

function RouteProvider(router: Router) {
  bindings.forEach(({ name, model }) => {
    router.param(name, handle(name, model))
  })
}

export default RouteProvider
