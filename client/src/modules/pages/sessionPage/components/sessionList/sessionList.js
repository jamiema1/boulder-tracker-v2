import React from "react"
import Climbs from "modules/pages/sessionPage/components/climbList/climbList.js"
import Accordion from "react-bootstrap/Accordion"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {getCurrentDateTime} from "modules/common/helpers.js"

import {useMutation, useQuery, useQueryClient} from "react-query"
import axios from "modules/api/axios.js"
import SessionAddButtonModal from "modules/pages/sessionPage/components/sessionList/components/sessionForms/components/sessionAddButtonModal.js"
import SessionInfo from "modules/pages/sessionPage/components/sessionList/components/sessionInfo.js"
import {handleError, sessionEndpoint} from "modules/api/endpoints.js"
import SessionViewButtonStack from "modules/pages/sessionPage/components/sessionList/components/sessionViewButtonStack.js"

export default function SessionList() {
  console.log("Re-render")
  /*
   * React Hooks:
   *
   * Refs:
   *  - newGymId: reference to new gym ID
   *  - newUserId: reference to new user ID
   *  - newSessionStartTime: reference to new start time
   *  - newSessionEndTime: reference to new end time
   */

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
    editSession.mutate({
      sessionId: session.id,
      newSession: {
        gymId: parseInt(session.gymId),
        userId: parseInt(session.userId),
        sessionStartTime: session.sessionStartTime,
        sessionEndTime: getCurrentDateTime(),
      },
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
      <Row className="mb-3 ">
        <Col className="text-end">
          <SessionAddButtonModal
            title={"Add a Session"}
          ></SessionAddButtonModal>
        </Col>
      </Row>
      <Row>
        <Accordion defaultActiveKey={0}>
          {[...allSessionData.data.data].reverse().map((session) => {
            return (
              <Accordion.Item
                eventKey={session.id}
                key={session.id}
                className="mb-3"
              >
                <Accordion.Header>
                  <SessionInfo session={session}></SessionInfo>
                </Accordion.Header>
                <Accordion.Body className="px-2 accordionBody">
                  <SessionViewButtonStack
                    session={session}
                    active={session.sessionEndTime === "0000-00-00 00:00:00"}
                    deactivate={() => endSession(session)}
                    remove={() => deleteSession.mutate(session.id)}
                  ></SessionViewButtonStack>
                  {false && (
                    <Climbs
                      sessionId={session.id}
                      sessionStartTime={session.sessionStartTime}
                      sessionEndTime={session.sessionEndTime}
                      gymId={session.gymId}
                    ></Climbs>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </Row>
    </Container>
  )
}
