import { Jwt, JwtPayload, VerifyErrors } from 'jsonwebtoken'

export type verifyTokenParams = {
  token: string
  withoutException?: boolean
}

export type verifyTokenResponse = {
  errors?: VerifyErrors | undefined
  decoded?: JwtPayload
}

export type JwtPayloadType = Jwt['payload'] | string | undefined

export type JwtType = Jwt
