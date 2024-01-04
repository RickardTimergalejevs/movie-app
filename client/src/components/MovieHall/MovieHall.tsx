import React from 'react'

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
  selectedSession: ISession
}

const MovieHall = ({ selectedSession }: Props) => {
  return (
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
  )
}

export default MovieHall
