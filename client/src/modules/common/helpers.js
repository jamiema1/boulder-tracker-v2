import React from "react"

export function getTimeDifferenceString(startDateTime, endDateTime) {
  const startTime = new Date(startDateTime)
  const endTime =
    endDateTime === "0000-00-00 00:00:00" ? new Date() : new Date(endDateTime)
  let minutes = Math.floor((endTime - startTime) / (1000 * 60))
  const hours = Math.floor(minutes / 60)
  minutes -= hours * 60

  let timeString = "".concat(hours).concat(" hr")
  if (minutes > 0) {
    timeString = timeString.concat(" ").concat(minutes).concat(" min")
  }
  return timeString
}

export function getCurrentDate() {
  return getDateString(new Date())
}

export function getCurrentDateTime() {
  return getDateTimeString(new Date())
}

export function convertToViewDate(startDate, endDate) {
  const startDateString = new Date(startDate).toLocaleString().split(",")[0]
  let endDateString = new Date(endDate).toLocaleString().split(",")[0]
  if (endDate === "0000-00-00") {
    endDateString = "Active"
  }

  return startDateString.concat(" - ").concat(endDateString)
}

export function convertToViewDateTime(startDateTime, endDateTime) {
  const startDateTimeString = new Date(startDateTime).toLocaleString()
  let endDateTimeString = new Date(endDateTime).toLocaleTimeString()
  if (endDateTime === "0000-00-00 00:00:00") {
    endDateTimeString = "Active"
  }
  return startDateTimeString.concat(" - ").concat(endDateTimeString)
}

export function convertToEditDate(editDate) {
  if (editDate === "0000-00-00") {
    return null
  }
  return getDateString(new Date(editDate))
}

export function convertToEditDateTime(dateTime) {
  if (dateTime === "0000-00-00 00:00:00") {
    return null
  }
  return getDateTimeString(new Date(dateTime))
}

function getDateString(date) {
  const timezoneOffset = date.getTimezoneOffset() / 60
  date.setHours(date.getHours() - timezoneOffset)
  return date.toISOString().substring(0, 10)
}

function getDateTimeString(date) {
  const timezoneOffset = date.getTimezoneOffset() / 60
  date.setHours(date.getHours() - timezoneOffset)
  return date.toISOString().substring(0, 16)
}

/*
 * React
 */

// export function getOptions(key, value) {
//   return (
//     <option key={key} value={value}>
//       {key}
//     </option>
//   )
// }

export function getInput(name, type, ref, defaultValue) {
  return (
    <div className="field">
      <label>{name}:</label>
      <input type={type} ref={ref} defaultValue={defaultValue}></input>
    </div>
  )
}

export function isEmpty(obj) {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) return false
  }

  return true
}
