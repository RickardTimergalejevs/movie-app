import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

//Middlewares
app.use(express.json())
app.use(cors())

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
