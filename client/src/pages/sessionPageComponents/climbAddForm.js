import React from "react"
import {getCurrentDateTime} from "../helpers.js"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import AddingButtonStack from "../addingButtonStack.js"

export default function ClimbAddForm({
  newLocationId,
  getBoulders,
  locationData,
  newBoulderId,
  boulderData,
  newAttempts,
  newSends,
  newClimbStartTime,
  newClimbEndTime,
  addClimb,
  clearClimbRefs,
}) {
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
          <FloatingLabel controlId="SendInput" label="Sends" className="mb-3">
            <Form.Control
              type="number"
              placeholder={1}
              ref={newSends}
              defaultValue={0}
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
  )
}
