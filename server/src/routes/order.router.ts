import { Router } from 'express'
import { createOrder } from '../controllers/order.controller'

const orderRouter = Router().post('/orders', createOrder)

export default orderRouter
