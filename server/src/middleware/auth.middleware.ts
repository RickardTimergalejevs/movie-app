import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

export interface IUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  location: string
  isAdmin: boolean
}

export interface CustomRequest extends Request {
  token: string | JwtPayload
}

const secretKey: Secret = 'test'

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers

  console.log('authorization', authorization)
  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authorization.split(' ')[1]
  const decoded = jwt.verify(token, secretKey)
  ;(req as any).user = decoded

  next()
}

export const generateAccessToken = (user: IUser) => {
  return jwt.sign(user, secretKey, { expiresIn: '30m' })
}
