import { IHall } from '../models/hall.model'
import SessionModel, { ISession } from '../models/session.model'
import { Request, Response } from 'express'
import mongoose from 'mongoose'

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

const createSession = async (req: Request, res: Response) => {
  const hall = new mongoose.Types.ObjectId('6595625feb9e39dd29e79748')

  try {
    const session: ISession = {
      movieId: '848326',
      city: 'Stockholm',
      hall: hall,
      showDate: '22.12.2024',
      showTime: '10:00',
      displayType: '3D',
    }

    const createdSession = await SessionModel.create(session)

    res.status(201).json(createdSession)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export { getAllSessions, getSessionsByMovieId, createSession }
