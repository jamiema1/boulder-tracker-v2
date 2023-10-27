/* eslint-disable max-lines */
import React, {useEffect, useRef, useState} from "react"
import {
  convertToEditDateTime,
  getCurrentDateTime,
  getOptions,
  // convertToViewDateTime,
} from "../helpers.js"
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
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap//Button"
import Container from "react-bootstrap/esm/Container.js"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Stack from "react-bootstrap/Stack"
// import Form from "react-bootstrap/Form"
// import FloatingLabel from "react-bootstrap/FloatingLabel"

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

  function getBoulders(locationId) {
    setBoulderData(
      allBoulderData.filter(
        (boulder) => parseInt(boulder.locationId) === parseInt(locationId)
      )
    )
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

  function loadInitialBoulders() {
    locationData.some((location) => {
      getBoulders(location.id)
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
        <Row className="mb-3">
          <Col className="text-end">
            <Button
              onClick={() => {
                changeStates(0, 0, true)
                loadInitialBoulders()
              }}
            >
              Add a Climb
            </Button>
          </Col>
        </Row>
      )}
      <Row>
        <Accordion defaultActiveKey={0}>
          {addingClimb && (
            <ListGroup.Item className="mb-2">
              <form className="components">
                <div className="fields">
                  <label>Location:</label>
                  <select
                    ref={newLocationId}
                    onChange={(e) => getBoulders(e.target.value)}
                  >
                    {locationData.map((location) => {
                      return getOptions(location.name, location.id)
                    })}
                  </select>
                  <label>Boulder:</label>
                  <select ref={newBoulderId}>
                    {boulderData.map((boulder) => {
                      return getOptions(
                        boulder.rating +
                          " | " +
                          boulder.colour +
                          " | " +
                          boulder.boulderType +
                          " | " +
                          boulder.description.substring(0, 25),
                        boulder.id
                      )
                    })}
                  </select>
                  <label>Attempts:</label>
                  <input
                    type="number"
                    ref={newAttempts}
                    defaultValue={1}
                  ></input>
                  <label>Sends:</label>
                  <input type="number" ref={newSends} defaultValue={0}></input>
                  <label>Start Time:</label>
                  <input
                    type="datetime-local"
                    ref={newClimbStartTime}
                    defaultValue={getCurrentDateTime()}
                  ></input>
                  <label>End Time:</label>
                  <input
                    type="datetime-local"
                    ref={newClimbEndTime}
                    defaultValue={getCurrentDateTime()}
                  ></input>
                </div>
                <div className="buttons">
                  <button
                    type="button"
                    className="addButton"
                    onClick={() => addClimb()}
                  >
                    <img src={images.addIcon}></img>
                  </button>
                  <button
                    type="button"
                    className="cancelButton"
                    onClick={() => clearClimbRefs()}
                  >
                    <img src={images.cancelIcon}></img>
                  </button>
                </div>
              </form>
            </ListGroup.Item>
          )}
          {[...climbData].reverse().map((climb) => {
            return (
              <ListGroup.Item key={climb.id} className="mb-2 p-0">
                {editingClimb !== climb.id && (
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
                )}
                {editingClimb == climb.id && (
                  <form className="components">
                    <div className="fields">
                      <label>Location:</label>
                      <select
                        ref={newLocationId}
                        onChange={(e) => getBoulders(e.target.value)}
                      >
                        {locationData.map((location) => {
                          return getOptions(location.name, location.id)
                        })}
                      </select>
                      <label>Boulder:</label>
                      <select ref={newBoulderId} defaultValue={climb.boulderId}>
                        {boulderData.map((boulder) => {
                          return getOptions(
                            boulder.rating +
                              " | " +
                              boulder.colour +
                              " | " +
                              boulder.boulderType +
                              " | " +
                              boulder.description.substring(0, 50),
                            boulder.id
                          )
                        })}
                      </select>
                      <label>Attempts:</label>
                      <input
                        type="number"
                        ref={newAttempts}
                        defaultValue={climb.attempts}
                      ></input>
                      <label>Sends:</label>
                      <input
                        type="number"
                        ref={newSends}
                        defaultValue={climb.sends}
                      ></input>
                      <label>Start Time:</label>
                      <input
                        type="datetime-local"
                        ref={newClimbStartTime}
                        defaultValue={convertToEditDateTime(
                          climb.climbStartTime
                        )}
                      ></input>
                      <label>End Time:</label>
                      <input
                        type="datetime-local"
                        ref={newClimbEndTime}
                        defaultValue={convertToEditDateTime(climb.climbEndTime)}
                      ></input>
                    </div>
                    <div className="buttons">
                      <button type="button" onClick={() => editClimb(climb.id)}>
                        <img src={images.confirmIcon}></img>
                      </button>
                      <button
                        type="button"
                        onClick={() => changeStates(0, 0, false)}
                      >
                        <img src={images.cancelIcon}></img>
                      </button>
                    </div>
                  </form>
                )}
                {editingClimb !== climb.id &&
                  !addingClimb &&
                  viewingClimb == climb.id && (
                  <Container>
                    <Row>
                      <Col>
                        <Stack direction="horizontal" gap={3}>
                          <Button
                            variant="warning"
                            onClick={() => {
                              changeStates(0, climb.id, false)
                              loadInitialBoulders()
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
                )}
              </ListGroup.Item>
            )
          })}
        </Accordion>
      </Row>
    </Container>
  )
}
