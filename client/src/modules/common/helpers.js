import {nullDate, nullDateTime} from "modules/common/constants"

export function getTimeDifferenceString(startDateTime, endDateTime) {
  const startTime = new Date(startDateTime)
  const endTime =
    endDateTime === nullDateTime ? new Date() : new Date(endDateTime)
  let minutes = Math.floor((endTime - startTime) / (1000 * 60))
  const hours = Math.floor(minutes / 60)
  minutes -= hours * 60

  let timeString = "".concat(hours).concat(" hr")
  if (minutes > 0) {
    timeString = timeString.concat(" ").concat(minutes).concat(" min")
  }
  return timeString
}

export function currentDate() {
  return new Date()
}

export function currentDateTime() {
  return new Date()
}

export function convertToViewDate(startDate, endDate) {
  const startDateString = new Date(startDate).toLocaleString().split(",")[0]
  let endDateString = new Date(endDate).toLocaleString().split(",")[0]
  if (endDate === nullDate) {
    endDateString = "Active"
  }

  return startDateString.concat(" - ").concat(endDateString)
}

export function convertToViewDateTime(startDateTime, endDateTime) {
  const startDateTimeString = new Date(startDateTime).toLocaleString()
  let endDateTimeString = new Date(endDateTime).toLocaleTimeString()
  if (endDateTime === nullDateTime) {
    endDateTimeString = "Active"
  }
  return startDateTimeString.concat(" - ").concat(endDateTimeString)
}

export function convertToEditDate(editDate) {
  if (editDate === nullDate) {
    return null
  }
  return formatStringDate(new Date(editDate))
}

export function convertToEditDateTime(dateTime) {
  if (dateTime === nullDateTime) {
    return null
  }
  return formatStringDateTime(new Date(dateTime))
}

export function formatStringDate(date) {
  const timezoneOffset = date.getTimezoneOffset() / 60
  date.setHours(date.getHours() - timezoneOffset)
  return date.toISOString().substring(0, 10)
}

export function formatStringDateTime(date) {
  const timezoneOffset = date.getTimezoneOffset() / 60
  date.setHours(date.getHours() - timezoneOffset)
  return date.toISOString().substring(0, 16)
}
