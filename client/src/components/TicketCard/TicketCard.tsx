import { useGetMovieQuery } from '../../redux/services/movies'
import { IOrderListResponse } from '../../redux/services/order'
import './TicketCard.scss'

type Props = {
  order: IOrderListResponse
  index: number
  showId?: boolean
}

const TicketCard = ({ order, index, showId = false }: Props) => {
  const { data: movie } = useGetMovieQuery(order.sessionId.movieId)

  return (
    <div className="ticket-card" key={index}>
      <div className="ticket-card-details">
        <h2 className="ticket-card-details__title">{movie?.title}</h2>
        <p className="ticket-card-details__field">
          <span>Date: </span>
          {order.sessionId?.showDate}
        </p>
        <p className="ticket-card-details__field">
          <span>Time: </span>
          {order.sessionId?.showTime}
        </p>
        <p className="ticket-card-details__field">
          <span>Type: </span>
          {order.sessionId?.displayType}
        </p>
        <p className="ticket-card-details__field">
          <span>Places: </span>
          {order.selectedSeats.join(', ')}
        </p>
        <p className="ticket-card-details__field">
          <span>Total Price: </span>
          {order.totalPrice} kr
        </p>
      </div>
      {showId && (
        <div className="ticket-card__id">
          <p>{order._id}</p>
        </div>
      )}
    </div>
  )
}

export default TicketCard
