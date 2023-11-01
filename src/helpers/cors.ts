import { ALLOWED_ORIGINS } from '../../config/cors'

export function corsOrigin(
  origin: string | undefined,
  callback: (
    err: Error | null,
    origin?: boolean | string | RegExp | (boolean | string | RegExp)[]
  ) => void
): void {
  // allow request with no origin
  // like mobile apps or curl requests
  if (!origin) callback(null, true)

  if (ALLOWED_ORIGINS.indexOf(String(origin)) === -1) {
    const msg = `The CORS policy for this site does not allow access to the specified Origin.`
    callback(new Error(msg), false)
  }

  callback(null, true)
}
