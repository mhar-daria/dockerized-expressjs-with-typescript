export const JWT_SECRET = process.env.JWT_SECRET || 'secret'
export const JWT_LEEWAY: number = parseInt(process.env.JWT_LEEWAY || '3600', 10)
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || 216000
