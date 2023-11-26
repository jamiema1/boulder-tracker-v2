import React, {useRef} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Form from "react-bootstrap/Form"

import axios from "modules/api/axios"
import {handleError, sessionEndpoint} from "modules/api/endpoints"

import {convertToEditDateTime} from "modules/common/helpers"
import EditingButtonStack from "modules/common/components/buttons/editingButtonStack"

import SessionGymIdInput from "modules/pages/sessionPage/sessionList/components/inputs/sessionGymIdInput"
import SessionUserIdInput from "modules/pages/sessionPage/sessionList/components/inputs/sessionUserIdInput"
import DateTimeInput from "modules/common/components/inputs/dateTimeInput"

export default function SessionEditForm({session, handleClose}) {
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

  const editSession = useMutation(
    ({sessionId, newSession}) =>
      axios.put(sessionEndpoint + "/" + sessionId, newSession),
    {
      onSuccess: (data, {sessionId, newSession}) => {
        queryClient.setQueryData(sessionEndpoint, {
          data: {
            data: [...allSessionData.data.data].map((session) => {
              return session.id === sessionId
                ? {id: sessionId, ...newSession}
                : session
            }),
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
      <SessionGymIdInput
        defaultValue={session.gymId}
        disabled={true}
        ref={gymIdRef}
      ></SessionGymIdInput>
      <SessionUserIdInput
        defaultValue={session.userId}
        disabled={true}
        ref={userIdRef}
      ></SessionUserIdInput>
      <DateTimeInput
        defaultValue={convertToEditDateTime(session.sessionStartTime)}
        ref={sessionStartTimeRef}
        controlId="StartTimeInput"
        label="Start Time"
      />
      <DateTimeInput
        defaultValue={convertToEditDateTime(session.sessionEndTime)}
        ref={sessionEndTimeRef}
        controlId="EndTimeInput"
        label="End Time"
      />
      <EditingButtonStack
        confirm={() => {
          editSession.mutate({
            sessionId: session.id,
            newSession: {
              gymId: parseInt(gymIdRef.current.value),
              userId: parseInt(userIdRef.current.value),
              sessionStartTime: sessionStartTimeRef.current.value,
              sessionEndTime:
                sessionEndTimeRef.current.value === ""
                  ? "0000-00-00 00:00:00"
                  : sessionEndTimeRef.current.value,
            },
          })
          handleClose()
        }}
        cancel={() => {
          handleClose()
        }}
      ></EditingButtonStack>
    </Form>
  )
}
