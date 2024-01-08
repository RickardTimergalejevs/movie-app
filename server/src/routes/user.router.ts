import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/user.controller'
import { authenticate } from '../middleware/auth.middleware'

const userRouter = Router()
  .post('/users/register', registerUser)
  .post('/users/login', loginUser)

export default userRouter
