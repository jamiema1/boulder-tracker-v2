/* eslint-disable max-len */
/* eslint-disable max-lines */
import React, {useState} from "react"
// import Climbs from "modules/pages/sessionPage/components/climbList/climbList.js"
import Accordion from "react-bootstrap/Accordion"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import SessionAddForm from "modules/pages/sessionPage/components/sessionList/components/sessionForms/sessionAddForm.js"
import {getCurrentDateTime} from "modules/common/helpers.js"

import {useMutation, useQuery, useQueryClient} from "react-query"
import SessionEditForm from "./components/sessionForms/sessionEditForm.js"
import axios from "api/axios.js"
import AddButton from "modules/common/components/addButton.js"
import SessionInfo from "modules/pages/sessionPage/components/sessionList/components/sessionInfo.js"
import {handleError, sessionEndpoint} from "api/endpoints.js"
import SessionViewButtonStack from "modules/pages/sessionPage/components/sessionList/components/sessionViewButtonStack.js"

export default function SessionList() {
  console.log("Re-render")
  /*
   * React Hooks:
   *
   * States:
   *  - sessionState: state of the session list
   *    - editingSession: id of the session being edited, 0 if none
   *    - addingSession: true if a session is being added, false if not
   *
   * Refs:
   *  - newGymId: reference to new gym ID
   *  - newUserId: reference to new user ID
   *  - newSessionStartTime: reference to new start time
   *  - newSessionEndTime: reference to new end time
   */

  const [sessionState, setSessionState] = useState({
    editingSession: 0,
    addSession: false,
  })

  /*
   * React Query Hooks & APIs
   */

  const queryClient = useQueryClient()

  const {
    isLoading: isLoadingSession,
    isError: isErrorSession,
    data: allSessionData,
    error: errorSession,
  } = useQuery(sessionEndpoint, () => axios.get(sessionEndpoint), {
    onError: (error) => handleError(error),
  })

  const closeSession = useMutation(
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

  const deleteSession = useMutation(
    (sessionId) => axios.delete(sessionEndpoint + "/" + sessionId),
    {
      onSuccess: (data, sessionId) => {
        queryClient.setQueryData(sessionEndpoint, {
          data: {
            data: [...allSessionData.data.data].filter((session) => {
              return session.id !== sessionId
            }),
          },
        })
      },
      onError: (error) => handleError(error),
    }
  )

  /*
   * Helper functions
   */

  function endSession(session) {
    closeSession.mutate({
      sessionId: session.id,
      newSession: {
        gymId: parseInt(session.gymId),
        userId: parseInt(session.userId),
        sessionStartTime: session.sessionStartTime,
        sessionEndTime: getCurrentDateTime(),
      },
    })
  }

  const addSessionState = () => {
    setSessionState({
      editingSession: 0,
      addingSession: true,
    })
  }

  const editSessionState = (session) => {
    setSessionState({
      editingSession: session.id,
      addingSession: false,
    })
  }

  const resetSessionState = () => {
    setSessionState({
      editingSession: 0,
      addingSession: false,
    })
  }

  /*
   * Return value
   */

  if (isLoadingSession) {
    return <div>Loading...</div>
  }

  if (isErrorSession) {
    return (
      <div>
        Error: {errorSession.message} | {errorSession.response.data.error}
      </div>
    )
  }

  return (
    <Container>
      {!sessionState.addingSession && (
        <AddButton
          addState={addSessionState}
          message={"Add a Session"}
        ></AddButton>
      )}
      <Row>
        <Accordion defaultActiveKey={0}>
          {sessionState.addingSession && (
            <SessionAddForm
              resetSessionState={resetSessionState}
            ></SessionAddForm>
          )}
          {[...allSessionData.data.data].reverse().map((session) => {
            return (
              <Accordion.Item
                eventKey={session.id}
                key={session.id}
                className="mb-3"
              >
                {sessionState.editingSession !== session.id && (
                  <Accordion.Header onClick={resetSessionState}>
                    <SessionInfo session={session}></SessionInfo>
                  </Accordion.Header>
                )}
                {sessionState.editingSession === session.id && (
                  <Accordion.Header>
                    <SessionEditForm
                      session={session}
                      resetSessionState={resetSessionState}
                    ></SessionEditForm>
                  </Accordion.Header>
                )}
                {sessionState.editingSession !== session.id &&
                  !sessionState.addingSession && (
                  <Accordion.Body className="px-2 accordionBody">
                    <SessionViewButtonStack
                      active={
                        session.sessionEndTime === "0000-00-00 00:00:00"
                      }
                      deactivate={() => endSession(session)}
                      edit={() => editSessionState(session)}
                      remove={() => deleteSession.mutate(session.id)}
                    ></SessionViewButtonStack>
                    {/* <Climbs
                      sessionId={session.id}
                      sessionStartTime={session.sessionStartTime}
                      sessionEndTime={session.sessionEndTime}
                      gymId={session.gymId}
                    ></Climbs> */}
                  </Accordion.Body>
                )}
              </Accordion.Item>
            )
          })}
        </Accordion>
      </Row>
    </Container>
  )
}
