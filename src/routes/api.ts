import express, { Request, Response } from 'express'
import {
  create as createUser,
  login,
  verifyToken,
} from '../controllers/UsersController'
import ValidateMiddleware from '../middlewares/ValidateMiddleware'
import SignUpValidation from '../validations/users/SignUpValidation'
import loginValidation from '../validations/users/LoginValidation'
import { getIpAddress } from '../helpers/common'
import { authBearer } from '../helpers/JWT'
import { all } from '../repositories/RoleRepository'
import User from '../models/User'
import UserRole from '../models/UserRole'
import { GroupRoleOutput } from '../models/GroupRole'

const router = express.Router()

router.get('/', (req, res) => {
  return res.send({ message: 'You are not allowed here.' })
})

router.post('/login', loginValidation, login)
router.post('/verify-token/:token', verifyToken)
router.get('/test', (req, res) => {
  return res.send({ ipAddress: getIpAddress(req) })
})

router.post(
  '/signup',
  authBearer(),
  ValidateMiddleware(SignUpValidation),
  createUser
)

router.get('/getAllRole', authBearer(), (req: Request, res: Response) => {
  return all().then((result) => {
    return res.send(result)
  })
})

type roleReqTypes = Request & {
  user?: typeof User & {
    role?: typeof UserRole
    groupRoles?: GroupRoleOutput[]
    permissions?: { [key: string]: string[] }
  }
}
router.get('/roles', authBearer(), (req: roleReqTypes, res: Response) => {
  const { user } = req

  const role = user?.role
  const groupRoles = user?.groupRoles
  const permissions = user?.permissions
  return res.send({ user, role, permissions })
})

export default router
