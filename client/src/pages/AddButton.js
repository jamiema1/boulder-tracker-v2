import React from "react"

import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function AddButton({changeStates}) {
  return (
    <Row className="mb-3 ">
      <Col className="text-end">
        <Button onClick={() => changeStates(0, 0, true)}>Add a Session</Button>
      </Col>
    </Row>
  )
}
