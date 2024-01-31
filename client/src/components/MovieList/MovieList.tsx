import { IMovie } from '../../interfaces/movie'
import MovieCard from '../MovieCard/MovieCard'
import './MovieList.scss'

type Props = {
  movies?: IMovie[]
  showDate?: boolean
  showRating?: boolean
  clickable?: boolean
}

const POSTER_PATH = import.meta.env.VITE_TMBD_POSTER_PATH

const MovieList = ({ movies, showDate, showRating, clickable }: Props) => {
  return (
    <div className="movie__list">
      {movies?.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={`${POSTER_PATH}${movie.poster_path}`}
          vote_average={movie.vote_average}
          release_date={movie.release_date}
          genre_ids={movie.genre_ids}
          showDate={showDate}
          showRating={showRating}
          clickable={clickable}
        />
      ))}
    </div>
  )
}

export default MovieList
