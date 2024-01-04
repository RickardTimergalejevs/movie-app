import React, { useState } from 'react'
import {
  formatDateWithWeekdayMonthAbbreviation,
  formatDayOfWeek,
  formatToDay,
} from '../../utils/dateFormatter'

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

type Props = {
  sessions: ISession[]
  dates: string[]
  selectedDate: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
  selectedSession: ISession | null
  setSelectedSession: React.Dispatch<React.SetStateAction<ISession | null>>
}

const Datepicker: React.FC<Props> = ({
  sessions,
  dates,
  selectedDate,
  setSelectedDate,
  selectedSession,
  setSelectedSession,
}: Props) => {
  const handleDateClick = (date: string) => {
    setSelectedDate(date)
  }

  const handleSessionClick = (session: ISession) => {
    setSelectedSession(session)
  }

  return (
    <div className="session-datepicker">
      <div className="session-date">
        <div className="session-date__title-container">
          <p className="session-date__title">
            {formatDateWithWeekdayMonthAbbreviation(selectedDate)}
          </p>
        </div>
        <div className="session-date__dates">
          {dates.map((date) => (
            <div className="date" key={date}>
              <p className="session-date__type">{formatDayOfWeek(date)}</p>
              <button
                className={`session-date__btn ${
                  date === selectedDate ? 'session-date__btn--selected' : ''
                }`}
                onClick={() => handleDateClick(date)}
              >
                {formatToDay(date)}
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
  )
}

export default Datepicker