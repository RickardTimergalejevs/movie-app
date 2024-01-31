import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useGetSessionsByMovieIdAndDateQuery,
  useGetSessionsByMovieIdQuery,
} from '../../redux/services/sessions'
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

  const [dates, setDates] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<string>(dates[0])
  const [selectedSession, setSelectedSession] = useState<ISession | null>(null)

  const { data: sessionsByMovieId } = useGetSessionsByMovieIdQuery({
    id,
  })

  console.log(sessionsByMovieId?.[0].showDate)
  console.log(selectedDate)

  const { data: sessionsByMovieIdAndDate } =
    useGetSessionsByMovieIdAndDateQuery(
      { id, date: selectedDate },
      { pollingInterval: 20000 },
    )

  useEffect(() => {
    if (sessionsByMovieId) {
      const currentDate = new Date().toISOString().split('T')[0]
      const uniqueDatesSet = new Set(
        sessionsByMovieId
          .map((session) => session.showDate)
          .filter((date) => date >= currentDate),
      )
      const newDates = Array.from(uniqueDatesSet)
      setDates(newDates)
      setSelectedDate(newDates[0])
    }
  }, [sessionsByMovieId])

  if (selectedSession) {
    dispatch(setSession(selectedSession))
  }

  console.log(sessionsByMovieIdAndDate)
  console.log(selectedSession)
  console.log('sessionsByMovieId', sessionsByMovieId)

  return (
    sessionsByMovieIdAndDate && (
      <div className="session-body">
        <Datepicker
          sessions={sessionsByMovieIdAndDate}
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
