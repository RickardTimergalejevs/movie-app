import { IHall } from '../models/hall.model'
import SessionModel from '../models/session.model'
import { Request, Response } from 'express'

const getAllSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await SessionModel.find({})

    if (!sessions) {
      res.status(404).json({ message: 'Sessions not found' })
    }

    res.status(200).json(sessions)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getSessionsByMovieId = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.id

    const session = await SessionModel.find({ movieId }).populate<{
      hall: IHall
    }>('hall')

    if (!session) {
      res.status(404).json({ message: 'Sessions not found for this movieId' })
    }

    res.status(200).json(session)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export { getAllSessions, getSessionsByMovieId }
