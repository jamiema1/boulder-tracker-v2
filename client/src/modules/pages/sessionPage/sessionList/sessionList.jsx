import React from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Accordion from "react-bootstrap/Accordion"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Stack from "react-bootstrap/Stack"

import axios from "modules/api/axios"
import {handleError, sessionEndpoint} from "modules/api/endpoints"

import {getCurrentDateTime, nullDateTime} from "modules/common/helpers"
import AddButtonModal from "modules/common/components/buttons/addButtonModal"
import DeleteButtonModal from "modules/common/components/buttons/deleteButtonModal"
import EditButtonModal from "modules/common/components/buttons/editButtonModal"
import EndButtonModal from "modules/common/components/buttons/endButtonModal"

import ClimbList from "modules/pages/sessionPage/climbList/climbList"
import SessionAddForm from "modules/pages/sessionPage/sessionList/components/sessionAddForm"
import SessionEditForm from "modules/pages/sessionPage/sessionList/components/sessionEditForm"
import SessionInfo from "modules/pages/sessionPage/sessionList/components/sessionInfo"

export default function SessionList() {
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

  const filteredSessionData = [...allSessionData.data.data]
    .reverse()
    .sort((session1, session2) =>
      new Date(session1.sessionStartTime) < new Date(session2.sessionStartTime)
        ? 1
        : -1
    )

  if (isErrorSession) {
    return (
      <div>
        Error: {errorSession.message} | {errorSession.response.data.error}
      </div>
    )
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col className="text-end">
          <AddButtonModal
            title={"Add Session"}
            form={<SessionAddForm></SessionAddForm>}
          ></AddButtonModal>
        </Col>
      </Row>
      <Row>
        <Accordion defaultActiveKey={0}>
          {filteredSessionData.map((session) => {
            return (
              <Accordion.Item
                eventKey={session.id}
                key={session.id}
                className="mb-3"
              >
                <Accordion.Header>
                  <SessionInfo session={session}></SessionInfo>
                </Accordion.Header>
                <Accordion.Body className="px-2">
                  <Stack direction="horizontal" gap={3}>
                    {session.sessionEndTime === nullDateTime && (
                      <EndButtonModal
                        confirmAction={() => endSession(session)}
                        title={"End Session"}
                        description={"Done already?"}
                      ></EndButtonModal>
                    )}
                    <EditButtonModal
                      title={"Edit Session"}
                      form={
                        <SessionEditForm session={session}></SessionEditForm>
                      }
                    ></EditButtonModal>
                    <DeleteButtonModal
                      confirmAction={() => deleteSession.mutate(session.id)}
                      title={"Delete Session"}
                    ></DeleteButtonModal>
                  </Stack>
                  <ClimbList session={session}></ClimbList>
                </Accordion.Body>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </Row>
    </Container>
  )
}
