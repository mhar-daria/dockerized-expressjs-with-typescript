import sha256 from 'crypto-js/sha256'
// import aes from 'crypto-js/aes'
import crypto from 'crypto-js'
import { UserOutput } from '../models/User'

export const authenticate = (
  hashedPassword: string,
  nonce: string,
  user: UserOutput
) => {
  const rawPassword = crypto.AES.decrypt(hashedPassword, nonce).toString(
    crypto.enc.Utf8
  )
  const compare = sha256(`${rawPassword}.${user.salt}`).toString()

  return compare === user.password
}
