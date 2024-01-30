import React, { useEffect, useState } from 'react'
import {
  formatDateWithWeekdayMonthAbbreviation,
  formatDayOfWeek,
  formatToDay,
} from '../../utils/dateFormatter'
import { ISession } from '../../interfaces/session'
import './Datepicker.scss'
import Button from '../common/Button/Button'

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
}) => {
  const handleDateClick = (date: string) => {
    setSelectedDate(date)
  }

  const handleSessionClick = (session: ISession) => {
    setSelectedSession(session)
  }

  useEffect(() => {
    setSelectedSession(sessions[0])
  }, [sessions])

  return (
    <div className="session-datepicker">
      <div className="session-date">
        <div className="session-date__title-container">
          <p className="session-date__title">
            {selectedDate
              ? formatDateWithWeekdayMonthAbbreviation(selectedDate)
              : 'Select Date'}
          </p>
        </div>
        <div className="session-date__dates">
          {dates.map((date) => (
            <div className="date" key={date}>
              <p className="session-date__type">{formatDayOfWeek(date)}</p>
              <Button
                children={formatToDay(date)}
                color="dark"
                selected={date === selectedDate}
                onClick={() => handleDateClick(date)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="session-time">
        <div className="session-time__title-container">
          <p className="session-time__title">Show Time</p>
        </div>
        <div className="session-time__time">
          {sessions.length > 0 ? (
            sessions?.map((session) => (
              <div className="time" key={session._id}>
                <p className="session-time__type">{session.displayType}</p>
                <Button
                  children={session.showTime}
                  color="dark"
                  selected={session === selectedSession}
                  onClick={() => handleSessionClick(session)}
                />
              </div>
            ))
          ) : (
            <p>Select date</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Datepicker
