import { Router } from 'express'
import {
  createSession,
  getAllSessions,
  getSessionsByMovieId,
} from '../controllers/session.controller'

const sessionRouter = Router()
  .get('/sessions', getAllSessions)
  .get('/sessions/:id', getSessionsByMovieId)
  .post('/sessions', createSession)

export default sessionRouter
