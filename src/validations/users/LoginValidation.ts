import { body } from 'express-validator'

export default [
  body('email', 'Email is required').exists(),
  body('email', 'Email should be a valid email').isEmail(),
  body('password', 'Password is required').exists(),
  body('tkid', 'TKID is required').exists(),
]
