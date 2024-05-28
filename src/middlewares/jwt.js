import jwt from 'jsonwebtoken'
import { env } from '../config/environment.js'

export const AccessTokenUser = (uid) => {
  return jwt.sign({ _id: uid }, env.JWT_SECRET, { expiresIn: '1d' })
}