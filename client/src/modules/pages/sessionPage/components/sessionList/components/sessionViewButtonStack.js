import React from "react"
import images from "images/images.js"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function SessionViewButtonStack({
  active,
  deactivate,
  edit,
  remove,
}) {
  return (
    <Container className="mb-2">
      <Row>
        <Col xl={10} sm={8} xs={6}></Col>
        <Col>
          <Stack direction="horizontal" gap={3}>
            {active && (
              <Button variant="secondary" onClick={deactivate}>
                End
              </Button>
            )}
            <Button variant="warning" onClick={edit}>
              <img src={images.editIcon}></img>
            </Button>
            <Button variant="danger" onClick={remove}>
              <img src={images.deleteIcon}></img>
            </Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}
