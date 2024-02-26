import React from "react"

import {LocalizationProvider, PickersDay} from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar"
import {gymEndpoint, handleError, sessionEndpoint} from "modules/api/endpoints"
import axios from "modules/api/axios"
import {useQuery} from "react-query"
import {Badge} from "@mui/material"
import {currentDate, formatStringDate} from "modules/common/helpers"

export default function SessionCalendar({setSession}) {
  const {isLoading: isLoadingSession, data: allSessionData} = useQuery(
    sessionEndpoint,
    () => axios.get(sessionEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  const {isLoading: isLoadingGym, data: allGymData} = useQuery(
    gymEndpoint,
    () => axios.get(gymEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  /*
   * Return value
   */

  if (isLoadingSession || isLoadingGym) {
    return <div>Loading...</div>
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="h-20"></div>
      <DateCalendar
        className="scale-125 border-1 border-customDark rounded-3xl"
        views={["day"]}
        shouldDisableDate={(date) => {
          return (
            formatStringDate(new Date(date)) >
            formatStringDate(currentDate())
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
            
            const icon = () => {
              const session = [...allSessionData.data.data]
                .find((session) =>
                  formatStringDate(new Date(session.sessionStartTime)) ==
                  formatStringDate(new Date(props.day))
                )
              const gym = allGymData.data.data.find((gym) => 
                parseInt(gym.id) === parseInt(session.gymId)
              )
              return gym.city.substring(0,1)
            }

            return (
              <Badge
                key={props.day.toString()}
                overlap="circular"
                badgeContent={isSelected ? icon() : undefined}
              >
                <PickersDay {...props}
                  style={isSelected ? {border: '2px solid #FFB703'} : {}} />
              </Badge>
            )
          },
        }}
        onChange={(date) => {
          const newSession = [...allSessionData.data.data]
            .find((session) =>
              formatStringDate(new Date(session.sessionStartTime)) ==
              formatStringDate(new Date(date))
            )
          // if (newSession != undefined) setSession(newSession)
          setSession(newSession)
        }}
      />
      <div className="h-20"></div>
    </LocalizationProvider>
  )
}
