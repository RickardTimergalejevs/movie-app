import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import sessionRouter from './routes/session.router'
import { hallSchema } from './models/hall.model'
import { sessionSchema } from './models/session.model'
import hallRouter from './routes/hall.router'
import userRouter from './routes/user.router'
import ticketRouter from './routes/ticket.router'

mongoose.model('Hall', hallSchema)
mongoose.model('Session', sessionSchema)

dotenv.config()
const app = express()

//Middlewares
app.use(express.json())
app.use(cors())

//Routes
app.use('/api', sessionRouter)
app.use('/api', hallRouter)
app.use('/api', userRouter)
app.use('/api', ticketRouter)

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
