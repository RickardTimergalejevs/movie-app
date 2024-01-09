import { Router } from 'express'
import {
  currentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/user.controller'
import { authenticate } from '../middleware/auth.middleware'

const userRouter = Router()
  .post('/users/register', registerUser)
  .post('/users/login', loginUser)
  .post('/users/logout', authenticate, logoutUser)
  .get('/users/current', authenticate, currentUser)

export default userRouter
