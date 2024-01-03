import { Router } from 'express'
import { createHall, getAllHalls } from '../controllers/hall.controller'

const hallRouter = Router()
  .get('/halls', getAllHalls)
  .post('/halls', createHall)

export default hallRouter
