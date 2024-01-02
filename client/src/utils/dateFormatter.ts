export const formatDateWithMonthAbbreviation = (date: string) => {
  const inputDate = new Date(date)

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const day = inputDate.getDate()
  const monthAbbreviation = monthNames[inputDate.getMonth()]
  const year = inputDate.getFullYear()

  return `${day} ${monthAbbreviation} ${year}`
}

export const convertToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  const hoursString = hours > 0 ? `${hours} h` : ''
  const minutesString = remainingMinutes > 0 ? `${remainingMinutes} min` : ''

  return `${hoursString} ${minutesString}`.trim()
}
