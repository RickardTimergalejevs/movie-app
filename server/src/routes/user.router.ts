import { Router } from 'express'
import { registerUser } from '../controllers/user.controller'

const userRouter = Router().post('/users', registerUser)

export default userRouter
