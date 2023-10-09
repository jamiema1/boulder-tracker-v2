import React from "react"

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
  date.setHours(date.getHours() - 7)
  return date.toISOString().substring(0, 10)
}

function getDateTimeString(date) {
  date.setHours(date.getHours() - 7)
  return date.toISOString().substring(0, 16)
}

/*
 * React
 */

export function getOptions([key, value]) {
  return (
    <option key={key} value={value}>
      {key}
    </option>
  )
}

export function getInput(name, type, ref, defaultValue) {
  return (
    <div className="field">
      <label>{name}:</label>
      <input type={type} ref={ref} defaultValue={defaultValue}></input>
    </div>
  )
}
