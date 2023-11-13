/* eslint-disable max-lines */
import React, {useEffect, useRef, useState} from "react"
import Locations from "./locations"

import images from "../../../../images/images.js"
import {
  get,
  add,
  edit,
  remove,
  gymEndpoint,
} from "../../../../api/endpoints.js"

import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import AddingButtonStack from "modules/common/components/addingButtonStack"
import AddButton from "modules/common/components/addButton"
import EditingButtonStack from "modules/common/components/editingButtonStack"

export default function Gyms(props) {
  /*
   * React Hooks:
   *
   * States:
   *  - gymData: array of gyms
   *  - viewingGym: id of the gym being viewed, 0 if none
   *  - edingGym: id of the gym being edited, 0 if none
   *  - addingGym: true if a gym is being added, false if not
   *
   * Refs:
   *  - newGymName: reference to new name
   *  - newGymAddress: reference to new address
   *  - new GymCity: reference to new city
   */

  const [gymData, setGymData] = useState([])
  const [viewingGym, setViewingGym] = useState(0)
  const [editingGym, setEditingGym] = useState(0)
  const [addingGym, setAddingGym] = useState(false)

  const newGymName = useRef("")
  const newGymAddress = useRef("")
  const newGymCity = useRef("")

  useEffect(() => {
    getGyms()
  }, [props.gymDataCentral])

  /*
   * APIs
   */

  function getGyms() {
    get(gymEndpoint, props.gymDataCentral, props.setGymDataCentral, setGymData)
  }

  function addGym() {
    add(
      gymEndpoint,
      props.gymDataCentral,
      props.setGymDataCentral,
      getNewGym(),
      setGymData,
      clearGymRefs
    )
  }

  function editGym(gymId) {
    edit(
      gymEndpoint,
      gymId,
      props.gymDataCentral,
      props.setGymDataCentral,
      getNewGym(),
      setGymData,
      clearGymRefs
    )
  }

  function deleteGym(gymId) {
    remove(
      gymEndpoint,
      gymId,
      props.gymDataCentral,
      props.setGymDataCentral,
      setGymData
    )
  }

  /*
   * Helper functions
   */

  function clearGymRefs() {
    newGymName.current.value = ""
    newGymAddress.current.value = ""
    newGymCity.current.value = ""
    changeStates(0, 0, false)
  }

  function getNewGym() {
    return {
      name: newGymName.current.value,
      address: newGymAddress.current.value,
      city: newGymCity.current.value,
    }
  }

  function changeStates(newViewingGym, newEditingGym, newAddingGym) {
    if (viewingGym === newViewingGym) {
      newViewingGym = 0
    }
    setViewingGym(newViewingGym)
    setEditingGym(newEditingGym)
    setAddingGym(newAddingGym)
  }

  /*
   * Return value
   */

  return (
    <Container>
      {!addingGym && (
        <AddButton
          changeStates={changeStates}
          message={"Add a Gym"}
        ></AddButton>
      )}
      <Row>
        <Accordion defaultActiveKey={0}>
          {addingGym && (
            <Accordion.Item eventKey={0} className="mb-3">
              <Accordion.Header>
                <Form>
                  <Row>
                    <Col xl={4}>
                      <FloatingLabel
                        controlId="NameInput"
                        label="Name"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          ref={newGymName}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xl={5}>
                      <FloatingLabel
                        controlId="AddressInput"
                        label="Address"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Address"
                          ref={newGymAddress}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xl={2}>
                      <FloatingLabel
                        controlId="CityInput"
                        label="City"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="City"
                          ref={newGymCity}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xl={1}>
                      <AddingButtonStack
                        add={addGym}
                        clearRefs={clearGymRefs}
                      ></AddingButtonStack>
                    </Col>
                  </Row>
                </Form>
              </Accordion.Header>
            </Accordion.Item>
          )}
          {gymData.map((gym) => {
            return (
              <Accordion.Item eventKey={gym.id} key={gym.id} className="mb-3">
                {editingGym !== gym.id && (
                  <Accordion.Header
                    // disabled={addingGym || editingGym}
                    onClick={() => {
                      changeStates(gym.id, 0, false)
                    }}
                  >
                    <Container>
                      <Row>
                        <Col className="px-0">
                          <Stack gap={3}>
                            <div>{gym.name}</div>
                            <div>{gym.city}</div>
                          </Stack>
                        </Col>
                        <Col className="text-end">
                          <div>{gym.address}</div>
                        </Col>
                      </Row>
                    </Container>
                  </Accordion.Header>
                )}
                {editingGym == gym.id && (
                  <Accordion.Header>
                    <Form>
                      <Row>
                        <Col xl={4}>
                          <FloatingLabel
                            controlId="NameInput"
                            label="Name"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Name"
                              ref={newGymName}
                              defaultValue={gym.name}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xl={5}>
                          <FloatingLabel
                            controlId="AddressInput"
                            label="Address"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Address"
                              ref={newGymAddress}
                              defaultValue={gym.address}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xl={2}>
                          <FloatingLabel
                            controlId="CityInput"
                            label="City"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              placeholder="City"
                              ref={newGymCity}
                              defaultValue={gym.city}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xl={1}>
                          <EditingButtonStack
                            edit={editGym}
                            id={gym.id}
                            changeStates={changeStates}
                          ></EditingButtonStack>
                        </Col>
                      </Row>
                    </Form>
                  </Accordion.Header>
                )}
                {editingGym !== gym.id && !addingGym && (
                  <Accordion.Body className="px-0 accordionBody">
                    <Container className="mb-2">
                      <Row>
                        <Col xl={10} sm={8} xs={6}></Col>
                        <Col>
                          <Stack direction="horizontal" gap={3}>
                            <Button
                              variant="warning"
                              onClick={() => changeStates(0, gym.id, false)}
                            >
                              <img src={images.editIcon}></img>
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => deleteGym(gym.id)}
                            >
                              <img src={images.deleteIcon}></img>
                            </Button>
                          </Stack>
                        </Col>
                      </Row>
                    </Container>
                    <Locations
                      gymId={gym.id}
                      gymDataCentral={props.gymDataCentral}
                      setGymDataCentral={props.setGymDataCentral}
                      locationDataCentral={props.locationDataCentral}
                      setLocationDataCentral={props.setLocationDataCentral}
                      boulderDataCentral={props.boulderDataCentral}
                      setBoulderDataCentral={props.setBoulderDataCentral}
                      climbDataCentral={props.climbDataCentral}
                      setClimbDataCentral={props.setClimbDataCentral}
                    ></Locations>
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
