/* eslint-disable max-lines */
import React, {useEffect, useRef, useState} from "react"
import Climbs from "./climbs"
import {
  convertToEditDateTime,
  getCurrentDateTime,
  getTimeDifferenceString,
} from "../helpers.js"
import images from "../../images/images.js"
import {
  get,
  add,
  edit,
  remove,
  sessionEndpoint,
  gymEndpoint,
  climbEndpoint,
  boulderEndpoint,
} from "../../api/endpoints.js"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"

// import AddButton from "../AddButton"
// import AddingButtonStack from "../AddingButtonStack"
// import EditingButtonStack from "../EditingButtonStack"

export default function Sessions(props) {
  /*
   * React Hooks:
   *
   * States:
   *  - sessionData: array of sessions
   *  - viewingSession: id of the session being viewed, 0 if none
   *  - edingSession: id of the session being edited, 0 if none
   *  - addingSession: true if a session is being added, false if not
   *
   * Refs:
   *  - newGymId: reference to new gym ID
   *  - newSessionStartTime: reference to new start time
   *  - newSessionEndTime: reference to new end time
   */

  const [sessionData, setSessionData] = useState([])
  const [gymData, setGymData] = useState([])
  const [boulderData, setBoulderData] = useState([])
  const [climbData, setClimbData] = useState([])

  const [viewingSession, setViewingSession] = useState(0)
  const [editingSession, setEditingSession] = useState(0)
  const [addingSession, setAddingSession] = useState(false)

  const newGymId = useRef(0)
  const newUserId = useRef(0)
  const newSessionStartTime = useRef("")
  const newSessionEndTime = useRef("")

  useEffect(() => {
    getSessions()
    getGyms()
    getBoulders()
    getClimbs()
  }, [
    props.gymDataCentral,
    props.boulderDataCentral,
    props.sessionDataCentral,
    props.climbDataCentral,
  ])

  /*
   * APIs
   */

  function getGyms() {
    get(gymEndpoint, props.gymDataCentral, props.setGymDataCentral, setGymData)
  }

  function getBoulders() {
    get(
      boulderEndpoint,
      props.boulderDataCentral,
      props.setBoulderDataCentral,
      setBoulderData
    )
  }

  function getClimbs() {
    get(
      climbEndpoint,
      props.climbDataCentral,
      props.setClimbDataCentral,
      setClimbData
    )
  }

  function getSessions() {
    get(
      sessionEndpoint,
      props.sessionDataCentral,
      props.setSessionDataCentral,
      setSessionData
    )
  }

  function addSession() {
    add(
      sessionEndpoint,
      props.sessionDataCentral,
      props.setSessionDataCentral,
      getNewSession(),
      setSessionData,
      clearSessionRefs
    )
  }

  function editSession(sessionId) {
    edit(
      sessionEndpoint,
      sessionId,
      props.sessionDataCentral,
      props.setSessionDataCentral,
      getNewSession(),
      setSessionData,
      clearSessionRefs
    )
  }

  function deleteSession(sessionId) {
    remove(
      sessionEndpoint,
      sessionId,
      props.sessionDataCentral,
      props.setSessionDataCentral,
      setSessionData
    )
  }

  function endSession(session) {
    // TODO: use existing EDIT function instead of creating new one
    edit(
      sessionEndpoint,
      session.id,
      props.sessionDataCentral,
      props.setSessionDataCentral,
      {
        gymId: parseInt(session.gymId),
        userId: parseInt(session.userId),
        sessionStartTime: session.sessionStartTime,
        sessionEndTime: getCurrentDateTime(),
      },
      setSessionData,
      () => {}
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
    changeStates(0, 0, false)
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

  function changeStates(
    newViewingSession,
    newEditingSession,
    newAddingSession
  ) {
    if (viewingSession == newViewingSession) {
      newViewingSession = 0
    }
    setViewingSession(newViewingSession)
    setEditingSession(newEditingSession)
    setAddingSession(newAddingSession)
  }

  function climbText(session) {
    const filteredClimbData = climbData.filter((climb) => {
      return parseInt(climb.sessionId) === parseInt(session.id)
    })

    let climbs = 0
    let attempts = 0
    let sends = 0
    let weightedRating = 0
    let weightedAttempts = 0
    filteredClimbData.forEach((climb) => {
      const boulder = boulderData.find((boulder) => {
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

  return (
    <Container>
      {!addingSession && (
        <Row className="mb-3">
          <Col className="text-end">
            <Button
              onClick={() => {
                changeStates(0, 0, true)
              }}
            >
              Add a Session
            </Button>
          </Col>
        </Row>
      )}
      <Row>
        <Accordion defaultActiveKey={0}>
          {addingSession && (
            <Accordion.Item eventKey={0} className="mb-3">
              <Accordion.Button>
                <Form>
                  <Row>
                    <Col xl>
                      <FloatingLabel
                        controlId="GymIDInput"
                        label="Gym ID"
                        className="mb-3"
                      >
                        <Form.Select ref={newGymId}>
                          {gymData.map((gym) => (
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
                        label="User ID"
                        className="mb-3"
                      >
                        <Form.Control
                          type="number"
                          placeholder={1}
                          ref={newUserId}
                          defaultValue={1}
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
                          placeholder={getCurrentDateTime()}
                          defaultValue={convertToEditDateTime(
                            getCurrentDateTime()
                          )}
                          ref={newSessionStartTime}
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
                          placeholder={getCurrentDateTime()}
                          ref={newSessionEndTime}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xl>
                      <Stack direction="horizontal" gap="3">
                        <Button variant="success" onClick={() => addSession()}>
                          <img src={images.addIcon}></img>
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => clearSessionRefs()}
                        >
                          <img src={images.cancelIcon}></img>
                        </Button>
                      </Stack>
                    </Col>
                  </Row>
                </Form>
              </Accordion.Button>
            </Accordion.Item>
          )}
          {[...sessionData].reverse().map((session) => {
            return (
              <Accordion.Item
                eventKey={session.id}
                key={session.id}
                className="mb-3"
              >
                {editingSession !== session.id && (
                  <Accordion.Button
                    disabled={addingSession || editingSession}
                    onClick={() => {
                      changeStates(session.id, 0, false)
                    }}
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
                                gymData.find((gym) => {
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
                  </Accordion.Button>
                )}
                {editingSession == session.id && (
                  <Accordion.Header>
                    <Form>
                      <Row>
                        <Col xl>
                          <FloatingLabel
                            controlId="GymIDInput"
                            label="Gym ID"
                            className="mb-3"
                          >
                            <Form.Select
                              ref={newGymId}
                              defaultValue={session.gymId}
                            >
                              {gymData.map((gym) => (
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
                            label="User ID"
                            className="mb-3"
                          >
                            <Form.Control
                              type="number"
                              placeholder={session.userId}
                              ref={newUserId}
                              defaultValue={session.userId}
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
                                session.sessionEndTime
                              )}
                              ref={newSessionStartTime}
                              defaultValue={convertToEditDateTime(
                                session.sessionEndTime
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
                            <Button
                              variant="success"
                              onClick={() => editSession(session.id)}
                            >
                              <img src={images.confirmIcon}></img>
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => changeStates(0, 0, false)}
                            >
                              <img src={images.cancelIcon}></img>
                            </Button>
                          </Stack>
                        </Col>
                      </Row>
                    </Form>
                  </Accordion.Header>
                )}
                {editingSession !== session.id && !addingSession && (
                  <Accordion.Body>
                    <Container>
                      <Row>
                        {/* {viewingSession === session.id && ( */}
                        <Col>
                          <Stack direction="horizontal" gap={3}>
                            {session.sessionEndTime ===
                              "0000-00-00 00:00:00" && (
                              <Button
                                variant="secondary"
                                onClick={() => {
                                  endSession(session)
                                }}
                              >
                                End
                              </Button>
                            )}
                            <Button
                              variant="warning"
                              onClick={() => changeStates(0, session.id, false)}
                            >
                              <img src={images.editIcon}></img>
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => deleteSession(session.id)}
                            >
                              <img src={images.deleteIcon}></img>
                            </Button>
                          </Stack>
                        </Col>
                        {/* )} */}
                      </Row>
                    </Container>
                    <Climbs
                      sessionId={session.id}
                      gymId={session.gymId}
                      gymDataCentral={props.gymDataCentral}
                      setGymDataCentral={props.setGymDataCentral}
                      locationDataCentral={props.locationDataCentral}
                      setLocationDataCentral={props.setLocationDataCentral}
                      boulderDataCentral={props.boulderDataCentral}
                      setBoulderDataCentral={props.setBoulderDataCentral}
                      climbDataCentral={props.climbDataCentral}
                      setClimbDataCentral={props.setClimbDataCentral}
                    ></Climbs>
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
