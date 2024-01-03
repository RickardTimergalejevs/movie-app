import { Router } from 'express'
import {
  createSession,
  getAllSessions,
  getSessionsByMovieIdAndDate,
} from '../controllers/session.controller'

const sessionRouter = Router()
  .get('/sessions', getAllSessions)
  .get('/sessions/:id/:date', getSessionsByMovieIdAndDate)
  .post('/sessions', createSession)

export default sessionRouter
