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
