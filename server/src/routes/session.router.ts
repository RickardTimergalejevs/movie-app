import { Router } from 'express'
import {
  createSession,
  getAllSessions,
  getSessionsByMovieId,
  getSessionsByMovieIdAndDate,
} from '../controllers/session.controller'

const sessionRouter = Router()
  .get('/sessions', getAllSessions)
  .get('/sessions/:id', getSessionsByMovieId)
  .get('/sessions/:id/:date', getSessionsByMovieIdAndDate)
  .post('/sessions', createSession)

export default sessionRouter
