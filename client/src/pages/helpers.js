export function getCurrentDate() {
  return getDateString(new Date())
}

export function getCurrentDateTime() {
  return getDateTimeString(new Date())
}

export function convertToViewDateTime(startDateTime, endDateTime) {
  const startDateTimeString = new Date(startDateTime).toLocaleString()
  const endDateTimeString = new Date(endDateTime).toLocaleTimeString()
  return startDateTimeString.concat(" - ").concat(endDateTimeString)
}

export function convertToEditDateTime(dateTime) {
  return getDateTimeString(new Date(dateTime))
}

export function convertToViewDate(startDate, endDate) {
  const startDateString = new Date(startDate).toLocaleString().split(",")[0]
  let endDateString = new Date(endDate).toLocaleString().split(",")[0]
  if (endDate === "0000-00-00") {
    endDateString = "Active"
  }

  return startDateString.concat(" - ").concat(endDateString)
}

export function convertToEditDate(editDate) {
  if (editDate === "0000-00-00") {
    return null
  }
  return getDateString(new Date(editDate))
}

function getDateString(date) {
  date.setHours(date.getHours() - 7)
  return date.toISOString().substring(0, 10)
}

function getDateTimeString(date) {
  date.setHours(date.getHours() - 7)
  return date.toISOString().substring(0, 16)
}
