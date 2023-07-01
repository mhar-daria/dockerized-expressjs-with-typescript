import { checkSchema } from 'express-validator'
import UserRepository from '../../repositories/UserRepository'
import * as _ from 'lodash'

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
  password: {
    matches: {
      errorMessage:
        'Password should be atleast 8 characters, has atleast 1 number, has atleast 1 uppercase value',
      options:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
    },
  },
})
