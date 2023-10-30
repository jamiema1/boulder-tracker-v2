import React, {useEffect, useState, useRef} from "react"
import Boulders from "./boulders"

import images from "../../images/images.js"
import {
  get,
  add,
  edit,
  remove,
  locationEndpoint,
} from "../../api/endpoints.js"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import AddingButtonStack from "../addingButtonStack"
import EditingButtonStack from "../editingButtonStack"
import AddButton from "../addButton"

export default function Locations(props) {
  /*
   * React Hooks:
   *
   * States:
   *  - locationData: array of locations
   *  - viewingLocation: id of the location being viewed, 0 if none
   *  - edingLocation: id of the location being edited, 0 if none
   *  - addingLocation: true if a location is being added, false if not
   *
   * Refs:
   *  - newLocationName: reference to new name
   */

  const [locationData, setLocationData] = useState([])
  const [allLocationData, setAllLocationData] = useState([])
  const [viewingLocation, setViewingLocation] = useState(0)
  const [editingLocation, setEditingLocation] = useState(0)
  const [addingLocation, setAddingLocation] = useState(false)

  const newLocationName = useRef("")

  useEffect(() => {
    getAllLocations()
  }, [props.locationDataCentral])

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

  function addLocation() {
    add(
      locationEndpoint,
      props.locationDataCentral,
      props.setLocationDataCentral,
      getNewLocation(),
      setAllLocationData,
      clearLocationRefs
    )
  }

  function editLocation(locationId) {
    edit(
      locationEndpoint,
      locationId,
      props.locationDataCentral,
      props.setLocationDataCentral,
      getNewLocation(),
      setAllLocationData,
      clearLocationRefs
    )
  }

  function deleteLocation(locationId) {
    remove(
      locationEndpoint,
      locationId,
      props.locationDataCentral,
      props.setLocationDataCentral,
      setAllLocationData
    )
  }

  /*
   * Helper functions
   */

  function clearLocationRefs() {
    newLocationName.current.value = ""
    changeStates(0, 0, false)
  }

  function getNewLocation() {
    return {
      gymId: parseInt(props.gymId),
      name: newLocationName.current.value,
    }
  }

  function changeStates(
    newViewingLocation,
    newEditingLocation,
    newAddingLocation
  ) {
    if (viewingLocation === newViewingLocation) {
      newViewingLocation = 0
    }

    setViewingLocation(newViewingLocation)
    setEditingLocation(newEditingLocation)
    setAddingLocation(newAddingLocation)
  }

  /*
   * Return value
   */

  return (
    <Container>
      {!addingLocation && (
        <AddButton
          changeStates={changeStates}
          message={"Add a Location"}
        ></AddButton>
      )}
      <Row>
        <Accordion defaultActiveKey={0}>
          {addingLocation && (
            <Accordion.Item eventKey={0} className="mb-3">
              <Accordion.Button>
                <Form>
                  <Row>
                    <Col xl>
                      <FloatingLabel
                        controlId="NameInput"
                        label="Name"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          ref={newLocationName}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xl>
                      <AddingButtonStack
                        add={addLocation}
                        clearRefs={clearLocationRefs}
                      ></AddingButtonStack>
                    </Col>
                  </Row>
                </Form>
              </Accordion.Button>
            </Accordion.Item>
          )}
          {locationData.map((location) => {
            return (
              <Accordion.Item
                eventKey={location.id}
                key={location.id}
                className="mb-3"
              >
                {editingLocation !== location.id && (
                  <Accordion.Button
                    disabled={addingLocation || editingLocation}
                    onClick={() => {
                      changeStates(location.id, 0, false)
                    }}
                  >
                    <Container>
                      <Row>
                        <Col>
                          <div>{location.name}</div>
                        </Col>
                      </Row>
                    </Container>
                  </Accordion.Button>
                )}
                {editingLocation == location.id && (
                  <Accordion.Header>
                    <Form>
                      <Row>
                        <Col xl>
                          <FloatingLabel
                            controlId="NameInput"
                            label="Name"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Name"
                              ref={newLocationName}
                              defaultValue={location.name}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <EditingButtonStack
                            edit={editLocation}
                            id={location.id}
                            changeStates={changeStates}
                          ></EditingButtonStack>
                        </Col>
                      </Row>
                    </Form>
                  </Accordion.Header>
                )}
                {editingLocation !== location.id && !addingLocation && (
                  <Accordion.Body className="px-0 accordionBody">
                    <Container className="mb-2">
                      <Row>
                        <Col xl={10} sm={8} xs={6}></Col>
                        <Col>
                          <Stack direction="horizontal" gap={3}>
                            <Button
                              variant="warning"
                              onClick={() =>
                                changeStates(0, location.id, false)
                              }
                            >
                              <img src={images.editIcon}></img>
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => deleteLocation(location.id)}
                            >
                              <img src={images.deleteIcon}></img>
                            </Button>
                          </Stack>
                        </Col>
                      </Row>
                    </Container>
                    <Boulders
                      locationId={location.id}
                      gymDataCentral={props.gymDataCentral}
                      setGymDataCentral={props.setGymDataCentral}
                      locationDataCentral={props.locationDataCentral}
                      setLocationDataCentral={props.setLocationDataCentral}
                      boulderDataCentral={props.boulderDataCentral}
                      setBoulderDataCentral={props.setBoulderDataCentral}
                      climbDataCentral={props.climbDataCentral}
                      setClimbDataCentral={props.setClimbDataCentral}
                    ></Boulders>
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
