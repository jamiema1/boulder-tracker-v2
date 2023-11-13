/* eslint-disable max-len */
import React, {useRef} from "react"
import {convertToEditDateTime} from "modules/common/helpers.js"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import EditingButtonStack from "modules/common/components/editingButtonStack.js"
import SessionGymIdInput from "modules/pages/sessionPage/components/sessionList/components/sessionForms/components/sessionGymIdInput"
import SessionUserIdInput from "modules/pages/sessionPage/components/sessionList/components/sessionForms/components/sessionUserIdInput"
import SessionStartTimeInput from "modules/pages/sessionPage/components/sessionList/components/sessionForms/components/sessionStartTimeInput"
import SessionEndTimeInput from "modules/pages/sessionPage/components/sessionList/components/sessionForms/components/sessionEndTimeInput"
import {handleError, sessionEndpoint} from "api/endpoints"
import axios from "api/axios"
import {useMutation, useQuery, useQueryClient} from "react-query"

export default function SessionEditForm({session, resetSessionState}) {
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
        clearSessionRefs()
      },
      onError: (error) => handleError(error),
    }
  )

  function clearSessionRefs() {
    gymIdRef.current.value = 0
    userIdRef.current.value = 0
    sessionStartTimeRef.current.value = ""
    sessionEndTimeRef.current.value = ""
    resetSessionState()
  }

  function getNewSession() {
    return {
      gymId: parseInt(gymIdRef.current.value),
      userId: parseInt(userIdRef.current.value),
      sessionStartTime: sessionStartTimeRef.current.value,
      sessionEndTime:
        sessionEndTimeRef.current.value === ""
          ? "0000-00-00 00:00:00"
          : sessionEndTimeRef.current.value,
    }
  }

  /*
   * Return Value
   */

  if (isLoadingSession) {
    return <div>Loading...</div>
  }

  return (
    <Form>
      <Row>
        <Col xl>
          <SessionGymIdInput
            defaultValue={session.gymId}
            disabled={true}
            ref={gymIdRef}
          ></SessionGymIdInput>
        </Col>
        <Col xl>
          <SessionUserIdInput
            defaultValue={session.userId}
            disabled={true}
            ref={userIdRef}
          ></SessionUserIdInput>
        </Col>
        <Col xl>
          <SessionStartTimeInput
            defaultValue={convertToEditDateTime(session.sessionStartTime)}
            ref={sessionStartTimeRef}
          ></SessionStartTimeInput>
        </Col>
        <Col xl>
          <SessionEndTimeInput
            defaultValue={convertToEditDateTime(session.sessionEndTime)}
            ref={sessionEndTimeRef}
          ></SessionEndTimeInput>
        </Col>
        <Col xl>
          <EditingButtonStack
            edit={() =>
              editSession.mutate({
                sessionId: session.id,
                newSession: getNewSession(),
              })
            }
            resetState={resetSessionState}
          ></EditingButtonStack>
        </Col>
      </Row>
    </Form>
  )
}
