import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import AddingButtonStack from "../addingButtonStack"

import {convertToEditDateTime, getCurrentDateTime} from "../helpers.js"

export default function SessionAddForm({
  newGymId,
  gymData,
  newUserId,
  newSessionStartTime,
  newSessionEndTime,
  addSession,
  clearSessionRefs,
}) {
  return (
    <Form>
      <Row>
        <Col xl>
          <FloatingLabel controlId="GymIDInput" label="Gym ID" className="mb-3">
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
              defaultValue={convertToEditDateTime(getCurrentDateTime())}
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
          <AddingButtonStack
            add={addSession}
            clearRefs={clearSessionRefs}
          ></AddingButtonStack>
        </Col>
      </Row>
    </Form>
  )
}
