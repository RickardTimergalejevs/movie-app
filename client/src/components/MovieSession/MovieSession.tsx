import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSessionsByMovieIdAndDateQuery } from '../../redux/services/sessions'
import './MovieSession.scss'

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

  const [selectedDate, setSelectedDate] = useState<string>('21.12.2024')
  const [selectedSession, setSelectedSession] = useState<ISession | null>(null)

  console.log(selectedDate)

  const {
    data: sessions,
    error,
    isLoading,
  } = useGetSessionsByMovieIdAndDateQuery({ id, date: selectedDate })
  console.log(sessions)

  const getUniqueDates = () => {
    let dates = []

    for (let i = 0; i < 5; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const formattedDate = `${year}.${month}.${day}`
      dates.push(formattedDate)
    }

    return dates
  }

  const handleDateClick = (date: string) => {
    setSelectedDate(date)
  }

  const handleSessionClick = (session: ISession) => {
    setSelectedSession(session)
  }

  return (
    sessions && (
      <div className="session-body">
        <div className="session-datepicker">
          <div className="session-date">
            <div className="session-date__title-container">
              <p className="session-date__title">Date</p>
            </div>
            <div className="session-date__dates">
              {getUniqueDates().map((date) => (
                <div className="date" key={date}>
                  <button
                    className={`session-date__btn ${
                      date === selectedDate ? 'session-date__btn--selected' : ''
                    }`}
                    onClick={() => handleDateClick(date)}
                  >
                    {date}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="session-time">
            <div className="session-time__title-container">
              <p className="session-time__title">Show Time</p>
            </div>
            <div className="session-time__time">
              {sessions?.map((session) => (
                <div className="time" key={session._id}>
                  <p className="session-time__type">{session.displayType}</p>
                  <button
                    className={`session-time__btn ${
                      session === selectedSession
                        ? 'session-time__btn--selected'
                        : ''
                    }`}
                    onClick={() => handleSessionClick(session)}
                  >
                    {session.showTime}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {selectedSession && (
          <div className="session-details">
            <div className="session-screen">
              <p className="session-screen__title">Screen</p>
            </div>
            <div className="session-row-list">
              {selectedSession.hall.rows.map((row, key) => (
                <div className="session-row" key={key}>
                  <p className="session-row__letter">{row.row}</p>
                  <div className="session-seat-list">
                    {row.seats.map((seat, key) => (
                      <div className="session-seat" key={key}>
                        <div className="session-seat__top"></div>
                        <div className="session-seat__bottom"></div>
                      </div>
                    ))}
                  </div>
                  <p className="session-row__letter">{row.row}</p>
                </div>
              ))}
            </div>
            <div className="session-seats-info">
              <div className="session-seat__selected">
                <div className="session-seat">
                  <div className="session-seat__top--green"></div>
                  <div className="session-seat__bottom--green"></div>
                </div>
                <p>Selected</p>
              </div>
              <div className="session-seat__available">
                <div className="session-seat">
                  <div className="session-seat__top"></div>
                  <div className="session-seat__bottom"></div>
                </div>
                <p>Available</p>
              </div>
              <div className="session-seat__taken">
                <div className="session-seat">
                  <div className="session-seat__top--red"></div>
                  <div className="session-seat__bottom--red"></div>
                </div>
                <p>Taken</p>
              </div>
            </div>
          </div>
        )}
        <div className="session-purchase">
          <p className="session-purchase__total">Total: 0 kr</p>
          <button className="session-purchase__btn">Checkout</button>
        </div>
      </div>
    )
  )
}

export default MovieSession
