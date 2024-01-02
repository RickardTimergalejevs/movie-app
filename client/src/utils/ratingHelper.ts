export const roundVoteAverage = (voteAverage: number) => {
  return Math.round(voteAverage)
}

export const getRatingColorClass = (voteAverage: number) => {
  const roundedVoteAverage = roundVoteAverage(voteAverage)

  if (roundedVoteAverage >= 7) {
    return 'movie-rating--green'
  } else if (roundedVoteAverage >= 5) {
    return 'movie-rating--yellow'
  } else if (roundedVoteAverage <= 4) {
    return 'movie-rating--red'
  }

  return ''
}
