import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/user.controller'

const userRouter = Router()
  .post('/users/register', registerUser)
  .post('/users/login', loginUser)

export default userRouter
