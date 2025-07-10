import React, {useRef} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import axios from "modules/api/axios"
import {handleError, sessionEndpoint} from "modules/api/endpoints"

import {convertToEditDateTime, currentDateTime} from "modules/common/helpers"

import SessionGymIdInput from "modules/pages/sessionPage/sessionList/components/inputs/sessionGymIdInput"
import SessionUserIdInput from "modules/pages/sessionPage/sessionList/components/inputs/sessionUserIdInput"
import DateTimeInput from "modules/common/components/inputs/dateTimeInput"
import Button from "modules/common/components/buttons/button"
import {nullDateTime} from "modules/common/constants"

export default function SessionAddForm({handleClose}) {
  /*
   * React Hooks:
   *
   * Refs:
   *  - newGymId: reference to new gym ID
   *  - newUserId: reference to new user ID
   *  - newSessionStartTime: reference to new start time
   *  - newSessionEndTime: reference to new end time
   */
  const gymIdRef = useRef(0)
  const userIdRef = useRef(0)
  const sessionStartTimeRef = useRef("")
  const sessionEndTimeRef = useRef("")

  const queryClient = useQueryClient()

  const {isLoading: isLoadingSession, data: allSessionData} = useQuery(
    sessionEndpoint,
    () => axios.get(sessionEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  const addSession = useMutation(
    (newSession) => axios.post(sessionEndpoint, newSession),
    {
      onSuccess: (data, newSession) => {
        queryClient.setQueryData(sessionEndpoint, {
          data: {
            data: [
              ...allSessionData.data.data,
              {id: data.data.data[0].id, ...newSession},
            ],
          },
        })
      },

      onError: (error) => handleError(error),
    }
  )

  /*
   * Return Value
   */

  if (isLoadingSession) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2 className="ml-2 mb-4">
        Add Session
      </h2>
      <form className="grid grid-cols-2 gap-4">
        <SessionGymIdInput ref={gymIdRef}></SessionGymIdInput>
        <SessionUserIdInput
          defaultValue={1}
          ref={userIdRef}>
        </SessionUserIdInput>
        <DateTimeInput
          defaultValue={convertToEditDateTime(currentDateTime())}
          ref={sessionStartTimeRef}
          controlId="StartTimeInput"
          label="Start Time"
        />
        <DateTimeInput
          ref={sessionEndTimeRef}
          controlId="EndTimeInput"
          label="End Time"
        />
      </form>
      <div className="flex justify-end gap-x-2">
        <Button
          text={"Add"}
          isSuccess={true}
          onClick={() => {
            handleClose()
            addSession.mutate({
              gymId: parseInt(gymIdRef.current.value),
              userId: parseInt(userIdRef.current.value),
              sessionStartTime: sessionStartTimeRef.current.value,
              sessionEndTime:
              sessionEndTimeRef.current.value === ""
                ? nullDateTime
                : sessionEndTimeRef.current.value,
            })
          }}
        />
        <Button
          text={"Cancel"}
          isSuccess={false}
          onClick={handleClose}
        />
      </div>
    </div>
  )
}
