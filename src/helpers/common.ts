import { Request } from 'express'
import _ from 'lodash'

export function loadEnv() {
  const fs = require('fs')
  const dotenv = require('dotenv')
  const envConfig = dotenv.parse(fs.readFileSync('.env'))

  for (var k in envConfig) {
    process.env[k] = envConfig[k]
  }

  console.log('[api][sequelize] Loaded database ENV vars from .env file')
}

export function random(length: number): string {
  const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890'

  const randomArr = Array.from(
    { length },
    (v, k) => chars[Math.floor(Math.random() * chars.length)]
  )

  return randomArr.join('')
}

export function getIpAddress(req: Request): string | undefined | null {
  const ip =
    req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    req.connection.remoteAddress ||
    req.socket.localAddress

  return String(ip).split(',').shift()
}

export function mergeCustomizer(value: any, newValue: any) {
  if (_.isArray(value)) {
    return newValue.concat(value)
  }
}

export function generatePassword(rawPassword = '') {
  const sha256 = require('crypto-js/sha256')

  const salt = random(10)

  return {
    salt,
    password: sha256(rawPassword + '.' + salt).toString(),
  }
}
