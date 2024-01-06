import Seat from '../Seat/Seat'
import { ISession } from '../../interfaces/session'
import './MovieHall.scss'
import { useState } from 'react'

type Props = {
  selectedSession: ISession
}

const MovieHall = ({ selectedSession }: Props) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [selectedSeatCount, setSelectedSeatCount] = useState<number>(1)
  const [hoveredSeats, setHoveredSeats] = useState<{
    status: string
    seats: string[]
  }>({
    status: 'visible',
    seats: [],
  })

  console.log('selectedSeats', selectedSeats)
  console.log('hoveredSeats', hoveredSeats)

  const getMaxIndexForRow = (row: string) => {
    const selectedRow = selectedSession.hall.rows.find((r) => r.row === row)

    return selectedRow ? selectedRow.seats.length : 0
  }

  const handleSeatClick = (
    row: string,
    seatIndex: number,
    isBooked: boolean,
  ) => {
    const isAnyHoveredSeatBooked = hoveredSeats.seats.some((hoveredSeat) =>
      selectedSession.hall.rows.some((hallRow) =>
        hallRow.seats.some(
          (seat) => seat.seat === hoveredSeat && seat.isBooked,
        ),
      ),
    )

    if (!isBooked && !isAnyHoveredSeatBooked) {
      const selectedSeats: string[] = []

      for (let i = seatIndex; i < seatIndex + selectedSeatCount; i++) {
        const maxIndex = getMaxIndexForRow(row)

        if (i >= 0 && i < maxIndex + 1) {
          const newSeat = `${row}${i}`
          selectedSeats.push(newSeat)
        } else {
          console.error(
            'A seat index selected that exceeds the maximum permissible value',
          )
          return
        }
      }

      setSelectedSeats(selectedSeats)
    }
  }

  const handleSeatHover = (
    row: string,
    seatIndex: number,
    isBooked: boolean,
  ) => {
    if (!isBooked) {
      const hoveredSeats: string[] = []

      for (let i = seatIndex; i < seatIndex + selectedSeatCount; i++) {
        const maxIndex = getMaxIndexForRow(row)

        if (i >= 0 && i < maxIndex + 1) {
          const newSeat = `${row}${i}`
          hoveredSeats.push(newSeat)
        } else {
          setHoveredSeats({
            status: 'error',
            seats: hoveredSeats,
          })

          console.error(
            'A seat index selected that exceeds the maximum permissible value',
          )
          return
        }
      }

      const isAnySeatAlreadyBooked = hoveredSeats.some((hoveredSeat) =>
        selectedSession.hall.rows.some((row) =>
          row.seats.some((seat) => seat.seat === hoveredSeat && seat.isBooked),
        ),
      )

      const status = isAnySeatAlreadyBooked ? 'error' : 'visible'

      setHoveredSeats({
        status,
        seats: hoveredSeats,
      })
    }
  }

  const handleIncrement = () => {
    setSelectedSeatCount((prevCount) => Math.min(prevCount + 1, 8))
    setSelectedSeats([])
  }

  const handleDecrement = () => {
    setSelectedSeatCount((prevCount) => Math.max(1, prevCount - 1))
    setSelectedSeats([])
  }

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
              {row.seats.map((seat, index) => (
                <Seat
                  type="session"
                  key={seat._id}
                  id={seat._id}
                  seat={seat.seat}
                  isBooked={seat.isBooked}
                  selectedSeats={selectedSeats}
                  hoveredSeats={hoveredSeats}
                  onSeatClick={() =>
                    handleSeatClick(row.row, index + 1, seat.isBooked)
                  }
                  onSeatHover={() =>
                    handleSeatHover(row.row, index + 1, seat.isBooked)
                  }
                  onSeatLeave={() =>
                    setHoveredSeats({
                      status: 'hidden',
                      seats: [],
                    })
                  }
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
      <div className="session-seats-count">
        <button className="session-seats-count__btn" onClick={handleDecrement}>
          -
        </button>
        <p className="session-seats-count__selected">
          Tickets: {selectedSeatCount}
        </p>
        <button className="session-seats-count__btn" onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  )
}

export default MovieHall
