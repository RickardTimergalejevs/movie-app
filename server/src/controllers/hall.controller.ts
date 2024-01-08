import { Request, Response } from 'express'
import HallModel, { IHall, IRow, ISeat } from '../models/hall.model'

const getAllHalls = async (req: Request, res: Response) => {
  try {
    const halls = await HallModel.find({})

    if (!halls) {
      res.status(404).json({ message: 'Halls not found' })
    }

    res.status(200).json(halls)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const createHall = async (req: Request, res: Response) => {
  try {
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

    const createdHall = await HallModel.create(hall)

    res.status(201).json(createdHall)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export { getAllHalls, createHall }
