import express, { Request, Response } from 'express'
import {
  create as createUser,
  login,
  verifyToken,
} from '../controllers/UsersController'
import ValidateMiddleware from '../middlewares/ValidatorMiddleware'
import SignUpValidation from '../validations/users/SignUpValidation'
import loginValidation from '../validations/users/LoginValidation'
import { getIpAddress, random } from '../helpers/common'
import { authBearer } from '../helpers/JWT'
import { all } from '../repositories/RoleRepository'
import User from '../models/User'
import UserRole from '../models/UserRole'
import { GroupRoleOutput } from '../models/GroupRole'
import { hashedPassword } from '../helpers/auth'

const router = express.Router()

router.get('/', (req, res) => {
  return res.send({ message: 'You are not allowed here. testing' })
})

router.post('/login', ValidateMiddleware(loginValidation), login)
router.post('/verify-token/:token', verifyToken)
router.get('/test', (req, res) => {
  return res.send({ ipAddress: getIpAddress(req) })
})
router.post('/hash', (req: Request, res: Response) => {
  const rawPassword = req.body.password || ''

  const { hash: password, nonce: tkid } = hashedPassword(rawPassword)

  return res.send({ tkid, password })
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

router.get('/roles', authBearer(), (req: Request, res: Response) => {
  const user = req.user as User

  const role = user?.role
  const groupRoles = user?.groupRoles
  const permissions = user?.permissions
  return res.send({ user, role, permissions, groupRoles })
})

export default router
