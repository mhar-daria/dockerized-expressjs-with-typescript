import { checkSchema } from 'express-validator'
import UserRepository from '../../repositories/UserRepository'
import * as _ from 'lodash'
import User from '../../models/User'

export default checkSchema({
  email: {
    exists: {
      errorMessage: 'Email is required',
    },
    isEmail: {
      errorMessage: 'Used a valid email',
      bail: true,
    },
    custom: {
      errorMessage: 'Email already exists.',
      options: (value, { req, location, path }) => {
        return UserRepository.findByEmail(value).then((user) => {
          if (user) {
            return Promise.reject('E-mail already in use.')
          }
        })
      },
    },
  },
  firstName: {
    exists: {
      errorMessage: 'First name is required',
    },
  },
  lastName: {
    exists: {
      errorMessage: 'Last name is required',
    },
  },
})
