import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import sessionRouter from './routes/session.router'
import { sessionSchema } from './models/session.model'
import userRouter from './routes/user.router'
import ticketRouter from './routes/ticket.router'
import { ticketSchema } from './models/ticket.model'
import orderRouter from './routes/order.router'
import checkoutRouter from './routes/checkout.router'

mongoose.model('Session', sessionSchema)
mongoose.model('Ticket', ticketSchema)

dotenv.config()
const app = express()

//Middlewares
app.use(express.json())
app.use(cors())

//Routes
app.use('/api', sessionRouter)
app.use('/api', userRouter)
app.use('/api', ticketRouter)
app.use('/api', orderRouter)
app.use('/api', checkoutRouter)

//Init server and connect to DB
const initApp = () => {
  mongoose.set('strictQuery', true)
  mongoose
    .connect(`${process.env.DB_HOST}`)
    .then(() => console.log('Connected to DB'))
    .catch(() => console.log('Fail'))
  app.listen(process.env.PORT, () =>
    console.log(`Server is up and running on port: ${process.env.PORT}`),
  )
}

initApp()
