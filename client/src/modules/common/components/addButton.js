import React from "react"

import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function AddButton({addState, message}) {
  return (
    <Row className="mb-3 ">
      <Col className="text-end">
        <Button onClick={addState}>{message}</Button>
      </Col>
    </Row>
  )
}
