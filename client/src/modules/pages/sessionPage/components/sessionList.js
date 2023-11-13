/* eslint-disable max-lines */
import React, {useRef, useState} from "react"
// import Climbs from "./climbs"
import images from "images/images.js"
// import {
//   get,
//   add,
//   edit,
//   remove,
//   sessionEndpoint,
//   gymEndpoint,
//   climbEndpoint,
//   boulderEndpoint,
// } from "../../api/endpoints.js"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
// eslint-disable-next-line max-len
import SessionAddForm from "modules/pages/sessionPage/components/sessionAddForm/sessionAddForm.js"
// import SessionEditForm from "./sessionEditForm"
// import AddButton from "../addButton"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import {
  convertToEditDateTime,
  getCurrentDateTime,
  getTimeDifferenceString,
} from "../../../common/helpers.js"

import {useMutation, useQuery, useQueryClient} from "react-query"
import Axios from "../../../../api/axios.js"

export const gymEndpoint = "/gym"
export const locationEndpoint = "/location"
export const boulderEndpoint = "/boulder"
export const sessionEndpoint = "/session"
export const climbEndpoint = "/climb"

export default function Sessions() {
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

  const newGymId = useRef(0)
  const newUserId = useRef(0)
  const newSessionStartTime = useRef("")
  const newSessionEndTime = useRef("")

  /*
   * React Query Hooks & APIs
   */

  const queryClient = useQueryClient()

  const {isLoading: isLoadingGym, data: allGymData} = useQuery(
    gymEndpoint,
    () => Axios.get(gymEndpoint)
  )

  const {isLoading: isLoadingBoulder, data: allBoulderData} = useQuery(
    boulderEndpoint,
    () => Axios.get(boulderEndpoint)
  )

  const {isLoading: isLoadingClimb, data: allClimbData} = useQuery(
    climbEndpoint,
    () => Axios.get(climbEndpoint)
  )

  const {
    isLoading: isLoadingSession,
    isError: isErrorSession,
    data: allSessionData,
    error: errorSession,
  } = useQuery(sessionEndpoint, () => Axios.get(sessionEndpoint))

  const editSession = useMutation(
    ({sessionId, newSession}) =>
      Axios.put(sessionEndpoint + "/" + sessionId, newSession),
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
    }
  )

  const deleteSession = useMutation(
    (sessionId) => Axios.delete(sessionEndpoint + "/" + sessionId),
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
    }
  )

  if (isLoadingSession || isLoadingGym || isLoadingBoulder || isLoadingClimb) {
    return <div>Loading...</div>
  }

  if (isErrorSession) {
    return (
      <div>
        Error: {errorSession.message} | {errorSession.response.data.error}
      </div>
    )
  }

  /*
   * Helper functions
   */

  function clearSessionRefs() {
    newGymId.current.value = 0
    newUserId.current.value = 0
    newSessionStartTime.current.value = ""
    newSessionEndTime.current.value = ""
    setSessionState({
      editingSession: 0,
      addingSession: false,
    })
  }

  function getNewSession() {
    return {
      gymId: parseInt(newGymId.current.value),
      userId: parseInt(newUserId.current.value),
      sessionStartTime: newSessionStartTime.current.value,
      sessionEndTime:
        newSessionEndTime.current.value === ""
          ? "0000-00-00 00:00:00"
          : newSessionEndTime.current.value,
    }
  }

  function climbText(session) {
    const filteredClimbData = [...allClimbData.data.data].filter((climb) => {
      return parseInt(climb.sessionId) === parseInt(session.id)
    })

    let climbs = 0
    let attempts = 0
    let sends = 0
    let weightedRating = 0
    let weightedAttempts = 0
    filteredClimbData.forEach((climb) => {
      const boulder = [...allBoulderData.data.data].find((boulder) => {
        return parseInt(boulder.id) === parseInt(climb.boulderId)
      })

      if (boulder === undefined) return

      // TODO: Change for unrated boulders
      if (boulder.rating != -1) {
        weightedRating += boulder.rating * climb.attempts
        weightedAttempts += climb.attempts
      }
      climbs += 1
      attempts += climb.attempts
      sends += climb.sends
    })

    weightedRating = Math.round((weightedRating / weightedAttempts) * 10) / 10

    return (
      <Stack gap={3}>
        <div className="text-end">{climbs} Climbs</div>
        <div className="text-end">{attempts} Attempts</div>
        <div className="text-end">{sends} Sends</div>
        <div className="text-end">{weightedRating} Rating</div>
      </Stack>
    )
  }

  /*
   * Return value
   */

  function addSessionButton() {
    return (
      <Row className="mb-3 ">
        <Col className="text-end">
          <Button
            onClick={() =>
              setSessionState({
                editingSession: 0,
                addingSession: true,
              })
            }
          >
            {"Add a Session"}
          </Button>
        </Col>
      </Row>
    )
  }

  function resetDefaultView() {
    setSessionState({
      editingSession: 0,
      addingSession: false,
    })
  }

  return (
    <Container>
      {!sessionState.addingSession && addSessionButton()}
      <Row>
        <Accordion defaultActiveKey={0}>
          {/* {sessionState.addingSession && addSessionForm()} */}
          {sessionState.addingSession && (
            <SessionAddForm
              resetDefaultView={resetDefaultView}
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
                  <Accordion.Header
                    onClick={() =>
                      setSessionState({
                        editingSession: 0,
                        addingSession: false,
                      })
                    }
                  >
                    <Container>
                      <Row>
                        <Col className="p-0">
                          <Stack gap={3}>
                            <div>
                              {new Date(
                                session.sessionStartTime
                              ).toLocaleDateString()}
                            </div>
                            <div>
                              {
                                allGymData.data.data.find((gym) => {
                                  return (
                                    parseInt(gym.id) === parseInt(session.gymId)
                                  )
                                })?.city
                              }
                            </div>
                            <div>
                              {getTimeDifferenceString(
                                session.sessionStartTime,
                                session.sessionEndTime
                              )}
                            </div>
                          </Stack>
                        </Col>
                        <Col>{climbText(session)}</Col>
                      </Row>
                    </Container>
                  </Accordion.Header>
                )}
                {sessionState.editingSession == session.id && (
                  <Accordion.Header>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault()
                        editSession.mutate({
                          sessionId: session.id,
                          newSession: getNewSession(),
                        })
                      }}
                    >
                      <Row>
                        <Col xl>
                          <FloatingLabel
                            controlId="GymIDInput"
                            label="Gym"
                            className="mb-3"
                          >
                            <Form.Select
                              ref={newGymId}
                              defaultValue={session.gymId}
                              disabled
                            >
                              {allGymData.data.data.map((gym) => (
                                <option key={gym.id} value={gym.id}>
                                  {gym.city}
                                </option>
                              ))}
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <FloatingLabel
                            controlId="UserIDInput"
                            label="User"
                            className="mb-3"
                          >
                            <Form.Control
                              type="number"
                              placeholder={session.userId}
                              ref={newUserId}
                              defaultValue={session.userId}
                              disabled
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <FloatingLabel
                            controlId="StartTimeInput"
                            label="Start Time"
                            className="mb-3"
                          >
                            <Form.Control
                              type="datetime-local"
                              placeholder={convertToEditDateTime(
                                session.sessionStartTime
                              )}
                              ref={newSessionStartTime}
                              defaultValue={convertToEditDateTime(
                                session.sessionStartTime
                              )}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <FloatingLabel
                            controlId="EndTimeInput"
                            label="End Time"
                            className="mb-3"
                          >
                            <Form.Control
                              type="datetime-local"
                              placeholder={convertToEditDateTime(
                                session.sessionEndTime
                              )}
                              ref={newSessionEndTime}
                              defaultValue={convertToEditDateTime(
                                session.sessionEndTime
                              )}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <Stack direction="horizontal" gap={3}>
                            <Button variant="success" type="submit">
                              <img src={images.confirmIcon}></img>
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() =>
                                setSessionState({
                                  editingSession: 0,
                                  addingSession: false,
                                })
                              }
                            >
                              <img src={images.cancelIcon}></img>
                            </Button>
                          </Stack>
                        </Col>
                      </Row>
                    </Form>
                  </Accordion.Header>
                )}
                {sessionState.editingSession !== session.id &&
                  !sessionState.addingSession && (
                  <Accordion.Body className="px-2 accordionBody">
                    <Container className="mb-2">
                      <Row>
                        <Col xl={10} sm={8} xs={6}></Col>
                        <Col>
                          <Stack direction="horizontal" gap={3}>
                            {session.sessionEndTime ===
                                "0000-00-00 00:00:00" && (
                              <Button
                                variant="secondary"
                                onClick={() =>
                                  editSession.mutate({
                                    sessionId: session.id,
                                    newSession: {
                                      gymId: parseInt(session.gymId),
                                      userId: parseInt(session.userId),
                                      sessionStartTime:
                                          session.sessionStartTime,
                                      sessionEndTime: getCurrentDateTime(),
                                    },
                                  })
                                }
                              >
                                  End
                              </Button>
                            )}
                            <Button
                              variant="warning"
                              onClick={() =>
                                setSessionState({
                                  editingSession: session.id,
                                  addingSession: false,
                                })
                              }
                            >
                              <img src={images.editIcon}></img>
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => deleteSession.mutate(session.id)}
                            >
                              <img src={images.deleteIcon}></img>
                            </Button>
                          </Stack>
                        </Col>
                      </Row>
                    </Container>
                    {/* <Climbs
                    // sessionId={session.id}
                    // sessionStartTime={session.sessionStartTime}
                    // sessionEndTime={session.sessionEndTime}
                    // gymId={session.gymId}
                    // gymDataCentral={props.gymDataCentral}
                    // setGymDataCentral={props.setGymDataCentral}
                    // locationDataCentral={props.locationDataCentral}
                    // setLocationDataCentral={props.setLocationDataCentral}
                    // boulderDataCentral={props.boulderDataCentral}
                    // setBoulderDataCentral={props.setBoulderDataCentral}
                    // climbDataCentral={props.climbDataCentral}
                    // setClimbDataCentral={props.setClimbDataCentral}
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
