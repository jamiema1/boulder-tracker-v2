export function convertToViewDate(startDateTime, endDateTime) {
  const startDate = new Date(startDateTime)
  const endDate = new Date(endDateTime)
  return startDate
    .toLocaleString()
    .concat(" - ")
    .concat(endDate.toLocaleTimeString())
}

export function convertToEditDate(dateTime) {
  const date = new Date(dateTime)
  date.setHours(date.getHours() - 7)
  return date.toISOString().substring(0, 16)
}
