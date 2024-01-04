import Seat from '../Seat/Seat'
import { ISession } from '../../interfaces/session'

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
        {selectedSession.hall.rows.map((row) => (
          <div className="session-row" key={row._id}>
            <p className="session-row__letter">{row.row}</p>
            <div className="session-seat-list">
              {row.seats.map((seat) => (
                <Seat
                  type="default"
                  isSessionSeat={true}
                  id={seat._id}
                  isBooked={seat.isBooked}
                  key={seat._id}
                />
              ))}
            </div>
            <p className="session-row__letter">{row.row}</p>
          </div>
        ))}
      </div>
      <div className="session-seats-info">
        <div className="session-seat__selected">
          <Seat type="selected" />
          <p>Selected</p>
        </div>
        <div className="session-seat__available">
          <Seat type="available" />
          <p>Available</p>
        </div>
        <div className="session-seat__taken">
          <Seat type="taken" />
          <p>Taken</p>
        </div>
      </div>
    </div>
  )
}

export default MovieHall
