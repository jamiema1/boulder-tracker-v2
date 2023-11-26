/* eslint-disable max-len */
/* eslint-disable max-lines */
import React, {useEffect, useState, useRef} from "react"
import Climbs from "../../climbs"
import images from "../../../../images/images.js"
import {
  currentDate,
  currentDateTime,
  convertToViewDate,
  convertToEditDate,
  formatStringDate,
} from "modules/common/helpers"
import {
  get,
  add,
  edit,
  remove,
  boulderEndpoint,
} from "modules/api/endpoints.js"
import Accordion from "react-bootstrap/Accordion"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import AddingButtonStack from "modules/common/components/buttons/addingButtonStack"
import EditingButtonStack from "modules/common/components/buttons/editingButtonStack"

export default function Boulders(props) {
  /*
   * React Hooks:
   *
   * States:
   *  - boulderData: array of boulders
   *  - viewingBoulder: id of the boulder being viewed, 0 if none
   *  - edingBoulder: id of the boulder being edited, 0 if none
   *  - addingBoulder: true if a boulder is being added, false if not
   *
   * Refs:
   *  - newBoulderName: reference to new name
   */

  const [boulderData, setBoulderData] = useState([])
  const [allBoulderData, setAllBoulderData] = useState([])
  const [viewingBoulder, setViewingBoulder] = useState(0)
  const [editingBoulder, setEditingBoulder] = useState(0)
  const [addingBoulder, setAddingBoulder] = useState(false)

  const newBoulderRating = useRef(0)
  const newBoulderColour = useRef("")
  const newBoulderBoulderType = useRef("")
  const newBoulderDescription = useRef("")
  const newBoulderSetStartDate = useRef("")
  const newBoulderSetEndDate = useRef("")

  const ratings = new Map([
    ["Unrated", -1],
    ["1 Hex", 1],
    ["2 Hex", 2],
    ["3 Hex", 3],
    ["4 Hex", 4],
    ["5 Hex", 5],
    ["6 Hex", 6],
  ])

  const colours = new Map([
    ["Black", "Black"],
    ["Blue", "Blue"],
    ["Green", "Green"],
    ["Orange", "Orange"],
    ["Pink", "Pink"],
    ["Purple", "Purple"],
    ["Red", "Red"],
    ["White", "White"],
    ["Yellow", "Yellow"],
  ])

  const boulderType = new Map([
    ["Slab", "Slab"],
    ["Overhang", "Overhang"],
  ])

  useEffect(() => {
    getAllBoulders()
  }, [props.boulderDataCentral])

  useEffect(() => {
    setBoulderData(
      allBoulderData.filter((boulder) => {
        return (
          parseInt(boulder.locationId) === parseInt(props.locationId) &&
          boulder.setEndDate === "0000-00-00"
        )
      })
    )
  }, [allBoulderData])

  /*
   * APIs
   */

  function getAllBoulders() {
    get(
      boulderEndpoint,
      props.boulderDataCentral,
      props.setBoulderDataCentral,
      setAllBoulderData
    )
  }

  function addBoulder() {
    add(
      boulderEndpoint,
      props.boulderDataCentral,
      props.setBoulderDataCentral,
      getNewBoulder(),
      setAllBoulderData,
      clearBoulderRefs
    )
  }

  function editBoulder(boulderId) {
    edit(
      boulderEndpoint,
      boulderId,
      props.boulderDataCentral,
      props.setBoulderDataCentral,
      getNewBoulder(),
      setAllBoulderData,
      clearBoulderRefs
    )
  }

  function deleteBoulder(boulderId) {
    remove(
      boulderEndpoint,
      boulderId,
      props.boulderDataCentral,
      props.setBoulderDataCentral,
      setAllBoulderData
    )
  }

  /*
   * Helper functions
   */

  function clearBoulderRefs() {
    newBoulderRating.current.value = 0
    newBoulderColour.current.value = ""
    newBoulderBoulderType.current.value = ""
    newBoulderDescription.current.value = ""
    newBoulderSetStartDate.current.value = ""
    newBoulderSetEndDate.current.value = ""
    changeStates(0, 0, false)
  }

  function getNewBoulder() {
    return {
      locationId: parseInt(props.locationId),
      rating: parseInt(newBoulderRating.current.value),
      colour: newBoulderColour.current.value,
      boulderType: newBoulderBoulderType.current.value,
      description: newBoulderDescription.current.value,
      setStartDate: newBoulderSetStartDate.current.value,
      setEndDate:
        newBoulderSetEndDate.current.value === ""
          ? "0000-00-00"
          : newBoulderSetEndDate.current.value,
    }
  }

  function changeStates(
    newViewingBoulder,
    newEditingBoulder,
    newAddingBoulder
  ) {
    if (viewingBoulder === newViewingBoulder) {
      newViewingBoulder = 0
    }
    setViewingBoulder(newViewingBoulder)
    setEditingBoulder(newEditingBoulder)
    setAddingBoulder(newAddingBoulder)
  }

  function closeBoulder(boulder) {
    // TODO: use existing EDIT function instead of creating new one
    edit(
      boulderEndpoint,
      boulder.id,
      props.boulderDataCentral,
      props.setBoulderDataCentral,
      {
        locationId: parseInt(props.locationId),
        rating: parseInt(boulder.rating),
        colour: boulder.colour,
        boulderType: boulder.boulderType,
        description: boulder.description,
        setStartDate: boulder.setStartDate,
        setEndDate: currentDateTime(),
      },
      setAllBoulderData,
      () => {}
    )
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
      {!addingBoulder && (
        <Button changeStates={changeStates} message={"Add a Boulder"}></Button>
      )}
      <Row>
        <Accordion defaultActiveKey={0}>
          {addingBoulder && (
            <Accordion.Item eventKey={0} className="mb-3">
              <Accordion.Header>
                <Form>
                  <Row>
                    <Col xl>
                      <FloatingLabel
                        controlId="RatingInput"
                        label="Rating"
                        className="mb-3"
                      >
                        <Form.Select ref={newBoulderRating}>
                          {Array.from(ratings).map(([key, value]) => (
                            <option key={key} value={value}>
                              {key}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xl>
                      <FloatingLabel
                        controlId="ColourInput"
                        label="Colour"
                        className="mb-3"
                      >
                        <Form.Select ref={newBoulderColour}>
                          {Array.from(colours).map(([key, value]) => (
                            <option key={key} value={value}>
                              {key}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xl>
                      <FloatingLabel
                        controlId="BoulderTypeInput"
                        label="Boulder Type"
                        className="mb-3"
                      >
                        <Form.Select ref={newBoulderBoulderType}>
                          {Array.from(boulderType).map(([key, value]) => (
                            <option key={key} value={value}>
                              {key}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    <Col xl>
                      <FloatingLabel
                        controlId="DescriptionInput"
                        label="Description"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Description"
                          ref={newBoulderDescription}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xl>
                      <FloatingLabel
                        controlId="SetStartDateInput"
                        label="Set Start Date"
                        className="mb-3"
                      >
                        <Form.Control
                          type="date"
                          placeholder={formatStringDate(currentDate())}
                          defaultValue={formatStringDate(currentDate())}
                          ref={newBoulderSetStartDate}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xl>
                      <FloatingLabel
                        controlId="SetEndDateInput"
                        label="Set End Date"
                        className="mb-3"
                      >
                        <Form.Control
                          type="date"
                          placeholder={formatStringDate(currentDate())}
                          ref={newBoulderSetEndDate}
                        />
                      </FloatingLabel>
                    </Col>
                    <Col xl>
                      <AddingButtonStack
                        add={addBoulder}
                        clearRefs={clearBoulderRefs}
                      ></AddingButtonStack>
                    </Col>
                  </Row>
                </Form>
              </Accordion.Header>
            </Accordion.Item>
          )}
          {[...boulderData].reverse().map((boulder) => {
            return (
              <Accordion.Item
                eventKey={boulder.id}
                key={boulder.id}
                className="mb-3"
              >
                {editingBoulder !== boulder.id && (
                  <Accordion.Header
                    // disabled={addingBoulder || editingBoulder}
                    onClick={() => {
                      changeStates(boulder.id, 0, false)
                    }}
                  >
                    <Container>
                      <Row>
                        <Col
                          className="p-0"
                          style={{backgroundColor: boulder.colour}}
                        ></Col>
                        <Col className="p-1">
                          <img
                            className="climbIcons"
                            src={getHexImage(boulder.rating)}
                          ></img>
                        </Col>
                        <Col className="p-1">
                          <img
                            className="climbIcons"
                            src={getBoulderTypeImage(boulder.boulderType)}
                          ></img>
                        </Col>
                        <Col xs={6} md={10} className="text-end">
                          <Stack>
                            <div>{boulder.description}</div>
                            <div>
                              {convertToViewDate(
                                boulder.setStartDate,
                                boulder.setEndDate
                              )}
                            </div>
                          </Stack>
                        </Col>
                      </Row>
                    </Container>
                  </Accordion.Header>
                )}
                {editingBoulder == boulder.id && (
                  <Accordion.Header>
                    <Form>
                      <Row>
                        <Col xl>
                          <FloatingLabel
                            controlId="RatingInput"
                            label="Rating"
                            className="mb-3"
                          >
                            <Form.Select
                              ref={newBoulderRating}
                              defaultValue={boulder.rating}
                            >
                              {Array.from(ratings).map(([key, value]) => (
                                <option key={key} value={value}>
                                  {value}
                                </option>
                              ))}
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <FloatingLabel
                            controlId="ColourInput"
                            label="Colour"
                            className="mb-3"
                          >
                            <Form.Select
                              ref={newBoulderColour}
                              defaultValue={boulder.colour}
                            >
                              {Array.from(colours).map(([key, value]) => (
                                <option key={key} value={key}>
                                  {value}
                                </option>
                              ))}
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <FloatingLabel
                            controlId="BoulderTypeInput"
                            label="Boulder Type"
                            className="mb-3"
                          >
                            <Form.Select
                              ref={newBoulderBoulderType}
                              defaultValue={boulder.boulderType}
                            >
                              {Array.from(boulderType).map(([key, value]) => (
                                <option key={key} value={key}>
                                  {value}
                                </option>
                              ))}
                            </Form.Select>
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <FloatingLabel
                            controlId="DescriptionInput"
                            label="Description"
                            className="mb-3"
                          >
                            <Form.Control
                              type="text"
                              placeholder="Description"
                              ref={newBoulderDescription}
                              defaultValue={boulder.description}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <FloatingLabel
                            controlId="SetStartDateInput"
                            label="Set Start Date"
                            className="mb-3"
                          >
                            <Form.Control
                              type="date"
                              placeholder={convertToEditDate(
                                boulder.setStartDate
                              )}
                              defaultValue={convertToEditDate(
                                boulder.setStartDate
                              )}
                              ref={newBoulderSetStartDate}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <FloatingLabel
                            controlId="SetEndDateInput"
                            label="Set End Date"
                            className="mb-3"
                          >
                            <Form.Control
                              type="date"
                              placeholder={convertToEditDate(
                                boulder.setEndDate
                              )}
                              defaultValue={convertToEditDate(
                                boulder.setEndDate
                              )}
                              ref={newBoulderSetEndDate}
                            />
                          </FloatingLabel>
                        </Col>
                        <Col xl>
                          <EditingButtonStack
                            edit={editBoulder}
                            id={boulder.id}
                            changeStates={changeStates}
                          ></EditingButtonStack>
                        </Col>
                      </Row>
                    </Form>
                  </Accordion.Header>
                )}
                {editingBoulder !== boulder.id && !addingBoulder && (
                  <Accordion.Body className="px-0 accordionBody">
                    <Container className="mb-2">
                      <Row>
                        <Col xl={10} sm={8} xs={6}></Col>
                        <Col>
                          <Stack direction="horizontal" gap={3}>
                            {boulder.setEndDate === "0000-00-00" && (
                              <Button
                                variant="secondary"
                                onClick={() => {
                                  closeBoulder(boulder)
                                }}
                              >
                                Close
                              </Button>
                            )}
                            <Button
                              variant="warning"
                              onClick={() => changeStates(0, boulder.id, false)}
                            >
                              <img src={images.editIcon}></img>
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => deleteBoulder(boulder.id)}
                            >
                              <img src={images.deleteIcon}></img>
                            </Button>
                          </Stack>
                        </Col>
                      </Row>
                    </Container>
                    <Climbs
                      boulderId={boulder.id}
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
