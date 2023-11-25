import React, {useRef} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Form from "react-bootstrap/Form"

import axios from "modules/api/axios"
import {handleError, sessionEndpoint} from "modules/api/endpoints"

import {
  convertToEditDateTime,
  getCurrentDateTime,
} from "modules/common/helpers"
import AddingButtonStack from "modules/common/components/buttons/addingButtonStack"

import SessionGymIdInput from "modules/pages/sessionPage/components/sessionList/components/sessionForms/components/sessionGymIdInput"
import SessionUserIdInput from "modules/pages/sessionPage/components/sessionList/components/sessionForms/components/sessionUserIdInput"
import DateTimeInput from "modules/common/components/inputs/dateTimeInput"

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
    <Form>
      <SessionGymIdInput ref={gymIdRef}></SessionGymIdInput>
      <SessionUserIdInput defaultValue={1} ref={userIdRef}></SessionUserIdInput>
      <DateTimeInput
        defaultValue={convertToEditDateTime(getCurrentDateTime())}
        ref={sessionStartTimeRef}
        controlId="StartTimeInput"
        label="Start Time"
      />
      <DateTimeInput
        ref={sessionEndTimeRef}
        controlId="EndTimeInput"
        label="End Time"
      />
      <AddingButtonStack
        confirm={() => {
          handleClose()
          addSession.mutate({
            gymId: parseInt(gymIdRef.current.value),
            userId: parseInt(userIdRef.current.value),
            sessionStartTime: sessionStartTimeRef.current.value,
            sessionEndTime:
              sessionEndTimeRef.current.value === ""
                ? "0000-00-00 00:00:00"
                : sessionEndTimeRef.current.value,
          })
        }}
        cancel={() => {
          handleClose()
        }}
      ></AddingButtonStack>
    </Form>
  )
}
