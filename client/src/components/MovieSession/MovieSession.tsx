import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSessionsByMovieIdAndDateQuery } from '../../redux/services/sessions'
import './MovieSession.scss'
import Datepicker from '../Datepicker/Datepicker'
import MovieHall from '../MovieHall/MovieHall'

interface ISeat {
  isBooked: boolean
  seat: string
}

interface IRow {
  row: string
  seats: ISeat[]
}

interface ISession {
  _id: string
  movieId: string
  city: string
  showDate: string
  showTime: string
  displayType: string
  hall: {
    _id: string
    name: string
    capacity: number
    rows: IRow[]
  }
}

const MovieSession = () => {
  const { id } = useParams()

  if (!id) {
    return <div>Error: Movie ID is not provided</div>
  }

  let dates: string[] = []

  for (let i = 0; i < 5; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const formattedDate = `${year}.${month}.${day}`
    dates.push(formattedDate)
  }

  const [selectedDate, setSelectedDate] = useState<string>(dates[0])
  const [selectedSession, setSelectedSession] = useState<ISession | null>(null)

  const {
    data: sessions,
    error,
    isLoading,
  } = useGetSessionsByMovieIdAndDateQuery({ id, date: selectedDate })
  console.log(sessions)

  return (
    sessions && (
      <div className="session-body">
        <Datepicker
          sessions={sessions}
          dates={dates}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
        />
        {selectedSession && <MovieHall selectedSession={selectedSession} />}
        <div className="session-purchase">
          <p className="session-purchase__total">Total: 0 kr</p>
          <button className="session-purchase__btn">Checkout</button>
        </div>
      </div>
    )
  )
}

export default MovieSession
