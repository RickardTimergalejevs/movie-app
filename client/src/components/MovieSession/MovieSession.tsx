import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSessionsByMovieIdAndDateQuery } from '../../redux/services/sessions'
import './MovieSession.scss'
import Datepicker from '../Datepicker/Datepicker'
import MovieHall from '../MovieHall/MovieHall'
import { ISession } from '../../interfaces/session'
import { useDispatch } from 'react-redux'
import { setSession } from '../../redux/features/order/orderSlice'

const MovieSession = () => {
  const dispatch = useDispatch()
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
    const formattedDate = `${year}-${month}-${day}`
    dates.push(formattedDate)
  }

  const [selectedDate, setSelectedDate] = useState<string>(dates[0])
  const [selectedSession, setSelectedSession] = useState<ISession | null>(null)

  if (selectedSession) {
    dispatch(setSession(selectedSession))
  }

  const {
    data: sessions,
    error,
    isLoading,
  } = useGetSessionsByMovieIdAndDateQuery({ id, date: selectedDate })
  console.log(sessions)
  console.log(selectedSession)

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
      </div>
    )
  )
}

export default MovieSession
