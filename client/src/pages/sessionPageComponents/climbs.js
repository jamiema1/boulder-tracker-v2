/* eslint-disable max-lines */
import React, {useEffect, useRef, useState} from "react"
import {
  getCurrentDateTime,
  convertToEditDateTime,
} from "../../modules/common/helpers.js"
import images from "../../images/images.js"
import {
  get,
  add,
  edit,
  remove,
  boulderEndpoint,
  climbEndpoint,
  locationEndpoint,
} from "../../api/endpoints.js"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap//Button"
import Container from "react-bootstrap/esm/Container.js"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Stack from "react-bootstrap/Stack"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import AddingButtonStack from "../../modules/common/components/addingButtonStack.js"
import EditingButtonStack from "../../modules/common/components/editingButtonStack.js"
// import ClimbAddForm from "./climbAddForm.js"
// import ClimbEditForm from "./climbEditForm.js"
// import AddButton from "../addButton.js"

export default function Climbs(props) {
  /*
   * React Hooks:
   *
   * States:
   *  - climbData: array of climbs
   *  - viewingClimb: id of the climb being viewed, 0 if none
   *  - edingClimb: id of the climb being edited, 0 if none
   *  - addingClimb: true if a climb is being added, false if not
   *
   * Refs:
   *  - newBoulderId: reference to new boulder ID
   *  - newClimbStartTime: reference to new start time
   *  - newClimbEndTime: reference to new end time
   */

  const [allClimbData, setAllClimbData] = useState([])
  const [climbData, setClimbData] = useState([])
  const [locationData, setLocationData] = useState([])
  const [allLocationData, setAllLocationData] = useState([])
  const [boulderData, setBoulderData] = useState([])
  const [allBoulderData, setAllBoulderData] = useState([])
  const [viewingClimb, setViewingClimb] = useState(0)
  const [editingClimb, setEditingClimb] = useState(0)
  const [addingClimb, setAddingClimb] = useState(false)

  const newLocationId = useRef(0)
  const newBoulderId = useRef(0)
  const newAttempts = useRef(0)
  const newSends = useRef(0)
  const newClimbStartTime = useRef("")
  const newClimbEndTime = useRef("")

  useEffect(() => {
    getAllClimbs()
    getAllLocations()
    getAllBoulders()
  }, [
    props.locationDataCentral,
    props.boulderDataCentral,
    props.climbDataCentral,
  ])

  useEffect(() => {
    setClimbData(
      allClimbData.filter(
        (climb) => parseInt(climb.sessionId) === parseInt(props.sessionId)
      )
    )
  }, [allClimbData])

  useEffect(() => {
    setLocationData(
      allLocationData.filter(
        (location) => parseInt(location.gymId) === parseInt(props.gymId)
      )
    )
  }, [allLocationData])

  /*
   * APIs
   */

  function getAllLocations() {
    get(
      locationEndpoint,
      props.locationDataCentral,
      props.setLocationDataCentral,
      setAllLocationData
    )
  }

  function getBouldersFromLocationInTimeRange(locationId, startTime, endTime) {
    console.log(startTime, endTime)
    const b = allBoulderData.filter((boulder) => {
      return parseInt(boulder.locationId) === parseInt(locationId)
    })

    // const c = b.filter((boulder) => {
    //   const rightLocation =
    //     parseInt(boulder.locationId) === parseInt(locationId)
    //   const afterStartTime =
    //     new Date(boulder.setStartDate) < new Date(startTime)
    //   console.log(boulder.setStartDate, startTime)
    //   // const beforeEndTime =
    //   //   new Date(boulder.setEndDate) > new Date(endTime) ||
    //   //   boulder.setEndDate === "0000-00-00"
    //   // console.log(new Date(boulder.setEndDate), new Date(endTime))
    //   return rightLocation && afterStartTime
    // })

    setBoulderData(b)
    // console.log(b)
    // console.log(c)
  }

  function getAllBoulders() {
    get(
      boulderEndpoint,
      props.boulderDataCentral,
      props.setBoulderDataCentral,
      setAllBoulderData
    )
  }

  function getAllClimbs() {
    get(
      climbEndpoint,
      props.climbDataCentral,
      props.setClimbDataCentral,
      setAllClimbData
    )
  }

  function addClimb() {
    add(
      climbEndpoint,
      props.climbDataCentral,
      props.setClimbDataCentral,
      getNewClimb(),
      setAllClimbData,
      clearClimbRefs
    )
  }

  function editClimb(climbId) {
    edit(
      climbEndpoint,
      climbId,
      props.climbDataCentral,
      props.setClimbDataCentral,
      getNewClimb(),
      setAllClimbData,
      clearClimbRefs
    )
  }

  function deleteClimb(climbId) {
    remove(
      climbEndpoint,
      climbId,
      props.climbDataCentral,
      props.setClimbDataCentral,
      setAllClimbData
    )
  }

  /*
   * Helper functions
   */

  function getLocationId(boulderId) {
    const boulder = allBoulderData.find(
      (boulder) => parseInt(boulder.id) === parseInt(boulderId)
    )

    return boulder.locationId
  }

  function clearClimbRefs() {
    newBoulderId.current.value = 0
    newAttempts.current.value = 0
    newSends.current.value = 0
    newClimbStartTime.current.value = ""
    newClimbEndTime.current.value = ""
    changeStates(0, 0, false)
  }

  function getNewClimb() {
    return {
      boulderId: parseInt(newBoulderId.current.value),
      sessionId: parseInt(props.sessionId),
      attempts: parseInt(newAttempts.current.value),
      sends: parseInt(newSends.current.value),
      climbStartTime: newClimbStartTime.current.value,
      climbEndTime: newClimbEndTime.current.value,
    }
  }

  function changeStates(newViewingClimb, newEditingClimb, newAddingClimb) {
    if (viewingClimb === newViewingClimb) {
      newViewingClimb = 0
    }

    setViewingClimb(newViewingClimb)
    setEditingClimb(newEditingClimb)
    setAddingClimb(newAddingClimb)
  }

  function loadInitialBoulders(sessionStartTime, sessionEndTime) {
    locationData.some((location) => {
      getBouldersFromLocationInTimeRange(
        location.id,
        sessionStartTime,
        sessionEndTime
      )
      return true
    })
  }

  function boulderText(climb) {
    const boulder = allBoulderData.find((boulder) => {
      return parseInt(boulder.id) === parseInt(climb.boulderId)
    })

    if (boulder === undefined) {
      return
    }

    return boulder.description
  }

  function getBoulderColour(climb) {
    const boulder = allBoulderData.find((boulder) => {
      return parseInt(boulder.id) === parseInt(climb.boulderId)
    })

    if (boulder === undefined) {
      return
    }

    return boulder.colour
  }

  function getBoulderRating(climb) {
    const boulder = allBoulderData.find((boulder) => {
      return parseInt(boulder.id) === parseInt(climb.boulderId)
    })

    if (boulder === undefined) {
      return
    }

    return boulder.rating
  }

  function getHexImage(rating) {
    switch (rating) {
    case -1:
      return images.unrated
    case 0:
      return images.sixHex
    case 1:
      return images.oneHex
    case 2:
      return images.twoHex
    case 3:
      return images.threeHex
    case 4:
      return images.fourHex
    case 5:
      return images.fiveHex
    case 6:
      return images.sixHex
    }
  }

  function getBoulderType(climb) {
    const boulder = allBoulderData.find((boulder) => {
      return parseInt(boulder.id) === parseInt(climb.boulderId)
    })

    if (boulder === undefined) {
      return
    }

    return boulder.boulderType
  }

  function getBoulderTypeImage(boulderType) {
    switch (boulderType) {
    case "Slab":
      return images.slab
    case "Overhang":
      return images.overhang
    }
  }

  /*
   * Return value
   */

  return (
    <Container>
      {!addingClimb && (
        <Row className="mb-3 ">
          <Col className="text-end">
            <Button
              onClick={() => {
                changeStates(0, 0, true)
                loadInitialBoulders(
                  props.sessionStartTime,
                  props.sessionEndTime
                )
              }}
            >
              {"Add a Climb"}
            </Button>
          </Col>
        </Row>
        // <AddButton
        //   changeStates={changeStates}
        //   message={"Add a Climb"}
        // ></AddButton>
      )}
      <Row>
        <Accordion defaultActiveKey={0}>
          {addingClimb && (
            <Accordion.Item eventKey={0} className="mb-3">
              <Accordion.Header>
                <Form>
                  <Row>
                    <Col xl>
                      <FloatingLabel
                        controlId="LocationIDInput"
                        label="Location"
                        className="mb-3"
                      >
                        <Form.Select
                          ref={newLocationId}
                          onChange={(e) =>
                            getBouldersFromLocationInTimeRange(
                              e.target.value,
                              props.sessionStartTime,
                              props.sessionEndTime
                            )
                          }
                        >
                          {locationData.map((location) => (
                            <option key={location.id} value={location.id}>
                              {location.name}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xl>
                      <FloatingLabel
                        controlId="BoulderIDInput"
                        label="Boulder"
                        className="mb-3"
                      >
                        <Form.Select ref={newBoulderId}>
                          {boulderData.map((boulder) => (
                            <option key={boulder.id} value={boulder.id}>
                              {boulder.rating +
                                " | " +
                                boulder.colour +
                                " | " +
                                boulder.boulderType +
                                " | " +
                                boulder.description.substring(0, 25)}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xl>
                      <FloatingLabel
                        controlId="AttemptInput"
                        label="Attempts"
                        className="mb-3"
                      >
                        <Form.Control
                          type="number"
                          placeholder={1}
                          ref={newAttempts}
                          defaultValue={1}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xl>
                      <FloatingLabel
                        controlId="SendInput"
                        label="Sends"
                        className="mb-3"
                      >
                        <Form.Control
                          type="number"
                          placeholder={1}
                          ref={newSends}
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
                          defaultValue={getCurrentDateTime()}
                          ref={newClimbStartTime}
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
                          defaultValue={getCurrentDateTime()}
                          ref={newClimbEndTime}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xl>
                      <AddingButtonStack
                        add={addClimb}
                        clearRefs={clearClimbRefs}
                      ></AddingButtonStack>
                    </Col>
                  </Row>
                </Form>
              </Accordion.Header>
            </Accordion.Item>
          )}
          {[...climbData].reverse().map((climb) => {
            return (
              <Accordion.Item
                eventKey={climb.id}
                key={climb.id}
                className="mb-3"
              >
                {editingClimb !== climb.id && (
                  <Accordion.Header
                    // disabled={addingClimb || editingClimb}
                    onClick={() => {
                      changeStates(climb.id, 0, false)
                    }}
                  >
                    <Container onClick={() => changeStates(climb.id, 0, false)}>
                      <Row>
                        <Col
                          // xs={1}
                          className="p-0"
                          style={{backgroundColor: getBoulderColour(climb)}}
                        ></Col>
                        <Col className="p-1">
                          <img
                            className="climbIcons"
                            src={getHexImage(getBoulderRating(climb))}
                          ></img>
                        </Col>
                        <Col className="p-1">
                          <img
                            className="climbIcons"
                            src={getBoulderTypeImage(getBoulderType(climb))}
                          ></img>
                        </Col>
                        <Col xs={6} md={10}>
                          <Stack>
                            <div className="text">
                              {climb.sends} / {climb.attempts}
                            </div>
                            <div className="text">{boulderText(climb)}</div>
                          </Stack>
                          {/* <div className="text">
                      {convertToViewDateTime(
                        climb.climbStartTime,
                        climb.climbEndTime
                      )}
                    </div> */}
                        </Col>
                      </Row>
                    </Container>
                  </Accordion.Header>
                )}
                {editingClimb == climb.id && (
                  <Accordion.Header>
                    {/* <ClimbEditForm
                      climb={climb}
                      newLocationId={newLocationId}
                      getBoulders={getBoulders}
                      newBoulderId={newBoulderId}
                      locationData={locationData}
                      allBoulderData={allBoulderData}
                      boulderData={boulderData}
                      newAttempts={newAttempts}
                      newSends={newSends}
                      newClimbStartTime={newClimbStartTime}
                      newClimbEndTime={newClimbEndTime}
                      editClimb={editClimb}
                      changeStates={changeStates}
                    ></ClimbEditForm> */}
                    <Form>
                      <Row>
                        <Col xl>
                          <FloatingLabel
                            controlId="LocationIDInput"
                            label="Location"
                            className="mb-3"
                          >
                            <Form.Select
                              ref={newLocationId}
                              onChange={(e) =>
                                getBouldersFromLocationInTimeRange(
                                  e.target.value,
                                  props.sessionStartTime,
                                  props.sessionEndTime
                                )
                              }
                              defaultValue={getLocationId(climb.boulderId)}
                              disabled
                            >
                              {locationData.map((location) => (
                                <option key={location.id} value={location.id}>
                                  {location.name}
                                </option>
                              ))}
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <FloatingLabel
                            controlId="BoulderIDInput"
                            label="Boulder"
                            className="mb-3"
                          >
                            <Form.Select
                              ref={newBoulderId}
                              defaultValue={climb.boulderId}
                              disabled
                            >
                              {boulderData.map((boulder) => (
                                <option key={boulder.id} value={boulder.id}>
                                  {boulder.rating +
                                    " | " +
                                    boulder.colour +
                                    " | " +
                                    boulder.boulderType +
                                    " | " +
                                    boulder.description.substring(0, 25)}
                                </option>
                              ))}
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <FloatingLabel
                            controlId="AttemptInput"
                            label="Attempts"
                            className="mb-3"
                          >
                            <Form.Control
                              type="number"
                              placeholder={1}
                              ref={newAttempts}
                              defaultValue={climb.attempts}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <FloatingLabel
                            controlId="SendInput"
                            label="Sends"
                            className="mb-3"
                          >
                            <Form.Control
                              type="number"
                              placeholder={1}
                              ref={newSends}
                              defaultValue={climb.sends}
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
                                climb.climbStartTime
                              )}
                              defaultValue={convertToEditDateTime(
                                climb.climbStartTime
                              )}
                              ref={newClimbStartTime}
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
                                climb.climbEndTime
                              )}
                              defaultValue={convertToEditDateTime(
                                climb.climbEndTime
                              )}
                              ref={newClimbEndTime}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <EditingButtonStack
                            edit={editClimb}
                            id={climb.id}
                            changeStates={changeStates}
                          ></EditingButtonStack>
                        </Col>
                      </Row>
                    </Form>
                  </Accordion.Header>
                )}
                {editingClimb !== climb.id && !addingClimb && (
                  <Accordion.Body className="px-2 accordionBody">
                    <Container>
                      <Row>
                        <Col xl={10} sm={8} xs={6}></Col>
                        <Col>
                          <Stack direction="horizontal" gap={3}>
                            <Button
                              variant="warning"
                              onClick={() => {
                                changeStates(0, climb.id, false)
                                loadInitialBoulders(
                                  props.sessionStartTime,
                                  props.sessionEndTime
                                )
                              }}
                            >
                              <img src={images.editIcon}></img>
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => deleteClimb(climb.id)}
                            >
                              <img src={images.deleteIcon}></img>
                            </Button>
                          </Stack>
                        </Col>
                      </Row>
                    </Container>
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
