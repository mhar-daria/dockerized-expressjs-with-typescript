import { JwtPayload, VerifyErrors } from 'jsonwebtoken'

export type verifyTokenParams = {
  token: string
  withoutException?: boolean
}

export type verifyTokenResponse = {
  errors?: VerifyErrors | undefined
  decoded?: JwtPayload | undefined
}
