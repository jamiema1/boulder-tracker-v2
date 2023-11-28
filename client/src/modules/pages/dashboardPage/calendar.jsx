import React from "react"

import {LocalizationProvider, PickersDay} from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar"
import {handleError, sessionEndpoint} from "modules/api/endpoints"
import axios from "modules/api/axios"
import {useQuery} from "react-query"
import {Badge} from "@mui/material"
import {formatStringDate} from "modules/common/helpers"

export default function Calendar() {
  const {isLoading: isLoadingSession, data: allSessionData} = useQuery(
    sessionEndpoint,
    () => axios.get(sessionEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  /*
   * Return value
   */

  if (isLoadingSession) {
    return <div>Loading...</div>
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="dateCalendarSpacer"></div>
      <DateCalendar
        className="calendar"
        views={["day"]}
        shouldDisableDate={(date) => {
          return (
            new Date().toISOString().split("T")[0] <=
            new Date(date).toISOString().split("T")[0]
          )
        }}
        slots={{
          day: (props) => {
            const isSelected =
              !props.outsideCurrentMonth &&
              [...allSessionData.data.data]
                .map((session) =>
                  formatStringDate(new Date(session.sessionStartTime))
                )
                .indexOf(formatStringDate(new Date(props.day))) >= 0

            return (
              <Badge
                key={props.day.toString()}
                overlap="circular"
                badgeContent={isSelected ? "✅" : undefined}
              >
                <PickersDay {...props} />
              </Badge>
            )
          },
        }}
      />
      <div className="dateCalendarSpacer"></div>
    </LocalizationProvider>
  )
}
