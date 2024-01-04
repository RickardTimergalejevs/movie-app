type Props = {
  color?: 'green' | 'gray' | 'red'
}

const Seat = ({ color }: Props) => {
  const seatTopClassName = `session-seat__top session-seat__top--${color}`
  const seatBottomClassName = `session-seat__bottom session-seat__bottom--${color}`

  return (
    <div className="session-seat">
      <div className={seatTopClassName}></div>
      <div className={seatBottomClassName}></div>
    </div>
  )
}

export default Seat
