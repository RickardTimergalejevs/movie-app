import './Seat.scss'

type Props = {
  type?: 'session' | 'selected' | 'available' | 'taken'
  id?: string
  isBooked?: boolean
  selectedSeats?: string[]
  seatIndex?: number
  row?: string
  seat?: string
  onSeatClick?: () => void
  hoveredSeats?: { status: string; seats: string[] }
  onSeatHover?: () => void
  onSeatLeave?: () => void
  isHoverAvailable?: boolean
}

const Seat = ({
  type,
  isBooked,
  selectedSeats,
  seat,
  onSeatClick,
  hoveredSeats,
  onSeatHover,
  onSeatLeave,
}: Props) => {
  const selected = selectedSeats && selectedSeats.includes(seat || '')
  const hovered = hoveredSeats && hoveredSeats?.seats?.includes(seat || '')

  const seatTopClassName = `session-seat__top session-seat__top--${type}
  ${isBooked ? 'session-seat__top--booked' : ''}
  ${selected ? 'session-seat__top--selected' : ''}
  ${
    hovered
      ? `session-seat__top--${
          hoveredSeats.status === 'visible' ? 'hovered' : 'hovered-error'
        }`
      : ''
  }
  `
  const seatBottomClassName = `session-seat__bottom session-seat__bottom--${type}
  ${isBooked ? 'session-seat__bottom--booked' : ''}
  ${selected ? 'session-seat__bottom--selected' : ''}
  ${
    hovered
      ? `session-seat__bottom--${
          hoveredSeats.status === 'visible' ? 'hovered' : 'hovered-error'
        }`
      : ''
  }
  `

  const handleSeatClick = () => {
    if (onSeatClick) {
      onSeatClick()
    }
  }

  const handleMouseEnter = () => {
    if (onSeatHover) {
      onSeatHover()
    }
  }

  const handleMouseLeave = () => {
    if (onSeatLeave) {
      onSeatLeave()
    }
  }

  return (
    <div
      className="session-seat"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleSeatClick}
    >
      <div className={seatTopClassName}></div>
      <div className={seatBottomClassName}></div>
    </div>
  )
}

export default Seat
