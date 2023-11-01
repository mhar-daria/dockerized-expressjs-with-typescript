import { ProductOutput } from '../models/Product'
import { UserOutput } from '../models/User'

declare namespace Express {
  export interface Request {
    user?: UserOutput
    product?: ProductOutput
  }
}
