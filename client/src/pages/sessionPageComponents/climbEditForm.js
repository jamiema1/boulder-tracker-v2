import React, {useEffect} from "react"
import {convertToEditDateTime} from "../../modules/common/helpers.js"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import EditingButtonStack from "../../modules/common/components/editingButtonStack.js"

export default function ClimbEditForm({
  climb,
  newLocationId,
  getBoulders,
  locationData,
  newBoulderId,
  boulderData,
  allBoulderData,
  newAttempts,
  newSends,
  newClimbStartTime,
  newClimbEndTime,
  editClimb,
  changeStates,
}) {
  // TODO: options for boulders do not always load correctly

  useEffect(() => {
    getBoulders(getLocationId(climb.boulderId))
  }, [])

  function getLocationId(boulderId) {
    const boulder = allBoulderData.find(
      (boulder) => parseInt(boulder.id) === parseInt(boulderId)
    )

    return boulder.locationId
  }

  return (
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
              onChange={(e) => getBoulders(e.target.value)}
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
          <FloatingLabel controlId="SendInput" label="Sends" className="mb-3">
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
              placeholder={convertToEditDateTime(climb.climbStartTime)}
              defaultValue={convertToEditDateTime(climb.climbStartTime)}
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
              placeholder={convertToEditDateTime(climb.climbEndTime)}
              defaultValue={convertToEditDateTime(climb.climbEndTime)}
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
  )
}
