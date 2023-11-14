import React from "react"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import DeleteButton from "modules/common/components/deleteButton"
import SessionEditButtonModal from "modules/pages/sessionPage/components/sessionList/components/sessionForms/components/sessionEditButtonModal"

export default function ClimbViewButtonStack({climb, remove}) {
  return (
    <Container className="mb-2">
      <Row>
        <Col xl={10} sm={8} xs={6}></Col>
        <Col>
          <Stack direction="horizontal" gap={3}>
            <SessionEditButtonModal
              climb={climb}
              title={"Edit Climb"}
            ></SessionEditButtonModal>
            <DeleteButton remove={remove} title={"Delete Climb"}></DeleteButton>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}
