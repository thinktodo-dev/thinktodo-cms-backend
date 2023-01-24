export const NAME_API = "core";
export const JWT_SECRET= process.env.JWTSecret || 'secret'
export const PAGE_LIMIT=15
export const JWT_EXPIRED_IN=process.env.JWT_EXPIRED_IN || '30m'