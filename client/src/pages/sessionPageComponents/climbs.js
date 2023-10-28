/* eslint-disable max-lines */
import React, {useEffect, useRef, useState} from "react"
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
import ClimbAddForm from "./climbAddForm.js"
import ClimbEditForm from "./climbEditForm.js"
import AddButton from "../addButton.js"

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
        <AddButton
          changeStates={changeStates}
          message={"Add a Climb"}
        ></AddButton>
      )}
      <Row>
        <Accordion defaultActiveKey={0}>
          {addingClimb && (
            <Accordion.Item eventKey={0} className="mb-3">
              <Accordion.Header>
                <ClimbAddForm
                  newLocationId={newLocationId}
                  getBoulders={getBoulders}
                  locationData={locationData}
                  newBoulderId={newBoulderId}
                  boulderData={boulderData}
                  newAttempts={newAttempts}
                  newSends={newSends}
                  newClimbStartTime={newClimbStartTime}
                  newClimbEndTime={newClimbEndTime}
                  addClimb={addClimb}
                  clearClimbRefs={clearClimbRefs}
                ></ClimbAddForm>
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
                    <ClimbEditForm
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
                    ></ClimbEditForm>
                  </Accordion.Header>
                )}
                {editingClimb !== climb.id && !addingClimb && (
                  <Accordion.Body className="px-2">
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
