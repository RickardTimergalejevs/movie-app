import SessionModel, {
  IHall,
  IRow,
  ISeat,
  ISession,
} from '../models/session.model'
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

    if (!session) {
      res.status(404).json({ message: 'Sessions not found for this movieId' })
    }

    res.status(200).json(session)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const createHall = async () => {
  const rows: IRow[] = []
  const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  for (let i = 0; i < rowLetters.length; i++) {
    const rowLetter = rowLetters[i]
    const seats: ISeat[] = []
    let seatCount = 20

    if (rowLetter === 'G') {
      seatCount = 18
    } else if (rowLetter === 'H') {
      seatCount = 16
    }

    for (let j = 1; j <= seatCount; j++) {
      const seat: ISeat = {
        seat: `${rowLetter}${j}`,
        isBooked: false,
      }
      seats.push(seat)
    }

    const row: IRow = {
      row: rowLetter,
      seats,
    }

    rows.push(row)
  }

  const hall: IHall = {
    name: 'Stockholm Hall Basic',
    capacity: rows.reduce((total, row) => total + row.seats.length, 0),
    rows,
  }

  return hall
}

const createSession = async (req: Request, res: Response) => {
  const createdHall = await createHall()

  try {
    const session: ISession = {
      movieId: 787699,
      city: 'Stockholm',
      hall: createdHall,
      showDate: '2024.02.02',
      showTime: '18:00',
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
