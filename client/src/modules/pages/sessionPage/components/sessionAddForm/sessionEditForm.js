import React from "react"
import {convertToEditDateTime} from "common/helpers.js"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import EditingButtonStack from "common/components/editingButtonStack.js"

export default function SessionEditForm({
  newGymId,
  session,
  gymData,
  newUserId,
  newSessionStartTime,
  newSessionEndTime,
  editSession,
  changeStates,
}) {
  return (
    <Form>
      <Row>
        <Col xl>
          <FloatingLabel controlId="GymIDInput" label="Gym ID" className="mb-3">
            <Form.Select ref={newGymId} defaultValue={session.gymId} disabled>
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
              // disabled={false}
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
              placeholder={convertToEditDateTime(session.sessionStartTime)}
              ref={newSessionStartTime}
              defaultValue={convertToEditDateTime(session.sessionStartTime)}
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
              placeholder={convertToEditDateTime(session.sessionEndTime)}
              ref={newSessionEndTime}
              defaultValue={convertToEditDateTime(session.sessionEndTime)}
            />
          </FloatingLabel>
        </Col>
        <Col xl>
          <EditingButtonStack
            edit={editSession}
            id={session.id}
            changeStates={changeStates}
          ></EditingButtonStack>
        </Col>
      </Row>
    </Form>
  )
}
