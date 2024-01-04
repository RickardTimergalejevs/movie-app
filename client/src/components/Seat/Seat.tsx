import { useState } from 'react'
import './Seat.scss'

type Props = {
  type?: 'selected' | 'available' | 'taken' | 'default'
  isSessionSeat?: boolean
  id?: string
  isBooked?: boolean
}

const Seat = ({ type, isSessionSeat = false, id, isBooked }: Props) => {
  const [isSelected, setIsSelected] = useState(false)

  const seatTopClassName = `session-seat__top session-seat__top--${type}
   ${isSelected && !isBooked ? 'session-seat__top--selected' : ''}
  ${isBooked ? 'session-seat__top--booked' : ''}
  `
  const seatBottomClassName = `session-seat__bottom session-seat__bottom--${type}
   ${isSelected && !isBooked ? 'session-seat__bottom--selected' : ''}
  ${isBooked ? 'session-seat__bottom--booked' : ''}
  `

  const handleSeatClick = () => {
    if (isSessionSeat && !isBooked) {
      setIsSelected((prevSelected) => !prevSelected)
      console.log(id)
    }
  }

  return (
    <div className="session-seat" onClick={handleSeatClick}>
      <div className={seatTopClassName}></div>
      <div className={seatBottomClassName}></div>
    </div>
  )
}

export default Seat
