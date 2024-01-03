import { Router } from 'express'
import {
  getAllSessions,
  getSessionsByMovieId,
} from '../controllers/session.controller'

const sessionRouter = Router()
  .get('/sessions', getAllSessions)
  .get('/sessions/:id', getSessionsByMovieId)

export default sessionRouter
