/* Example: 19 OCT 2023 */
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

/* Example: Wednesday, Jan 31 */
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

/* Example: Sun */
export const formatDayOfWeek = (dt: string) => {
  const date = new Date(dt)

  const weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const weekAbbreviation = weekNames[date.getDay()]

  return weekAbbreviation
}

/* Example: DD */
export const formatToDay = (dt: string) => {
  const date = new Date(dt)

  const day = date.getDate()

  return day
}

/* Example: 2 h 4 min */
export const convertToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  const hoursString = hours > 0 ? `${hours} h` : ''
  const minutesString = remainingMinutes > 0 ? `${remainingMinutes} min` : ''

  return `${hoursString} ${minutesString}`.trim()
}

/* Example: YYYY-MM-DD */
export const getCurrentDate = () => {
  const currentDate = new Date()
  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
