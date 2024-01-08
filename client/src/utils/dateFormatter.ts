export const formatDateWithMonthAbbreviation = (dt: string) => {
  const date = new Date(dt)

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

  const day = date.getDate()
  const monthAbbreviation = monthNames[date.getMonth()]
  const year = date.getFullYear()

  return `${day} ${monthAbbreviation} ${year}`
}

export const formatDateWithWeekdayMonthAbbreviation = (dt: string) => {
  const date = new Date(dt)

  const weekNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
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

  const weekDay = weekNames[date.getDay()]
  const monthAbbreviation = monthNames[date.getMonth()]
  const day = date.getDate()

  return `${weekDay}, ${monthAbbreviation} ${day}`
}

export const formatDayOfWeek = (dt: string) => {
  const date = new Date(dt)

  const weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const weekAbbreviation = weekNames[date.getDay()]

  return weekAbbreviation
}

export const formatToDay = (dt: string) => {
  const date = new Date(dt)

  const day = date.getDate()

  return day
}

export const convertToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  const hoursString = hours > 0 ? `${hours} h` : ''
  const minutesString = remainingMinutes > 0 ? `${remainingMinutes} min` : ''

  return `${hoursString} ${minutesString}`.trim()
}
