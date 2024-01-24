import { IHall } from '../models/hall.model'
import SessionModel, { ISession } from '../models/session.model'
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { ITicket } from '../models/ticket.model'

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

const getSessionsByMovieIdAndDate = async (req: Request, res: Response) => {
  try {
    const { id, date } = req.params

    const session = await SessionModel.find({ movieId: id, showDate: date })
      .sort({ showDate: 1, showTime: 1 })
      .populate<{
        hall: IHall
        tickets: ITicket[]
      }>(['hall', 'tickets'])
      .lean()

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
      movieId: '787699',
      city: 'Stockholm',
      hall: hall,
      showDate: '2024.01.27',
      showTime: '16:00',
      displayType: '3D',
      tickets: [
        new mongoose.Types.ObjectId('65b1126e7ecbe0c351f6387a'),
        new mongoose.Types.ObjectId('65b112b2ce6d8a3cf69fd1f2'),
        new mongoose.Types.ObjectId('65b112bd443503645668ec8c'),
      ],
    }

    const createdSession = await SessionModel.create(session)

    res.status(201).json(createdSession)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export { getAllSessions, getSessionsByMovieIdAndDate, createSession }
