import _ from './../utils/LodashMixins'
import User from '../models/User'
import UserRole from '../models/UserRole'
import { NextFunction, Request, Response } from 'express'

type UserType = typeof User & {
  role?: typeof UserRole
  permissions?: { [key: string]: string[] }
}

type RequestType = Request & { user?: UserType | null }

export default function canAccess(string: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User
    const { permissions } = user || {}
    const pascalString = `can${_.pascalCase(string)}`

    if (!_.isEmpty(permissions)) {
      const flattenPermissions = _.flatMapDeep(permissions)

      if (_.indexOf(flattenPermissions, pascalString) > -1) return next()
    }

    return res.status(401).send({
      message: "You don't have permission to access the page.",
      code: 401,
      errors: [],
      test: 'sample',
    })
  }
}
