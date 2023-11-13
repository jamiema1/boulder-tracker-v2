import React from "react"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import DeleteButton from "modules/common/components/deleteButton"
import SessionEditButtonModal from "modules/pages/sessionPage/components/sessionList/components/sessionForms/components/sessionEditButtonModal"
import SessionEndButtonModal from "modules/pages/sessionPage/components/sessionList/components/sessionForms/components/sessionEndButtonModal"

export default function SessionViewButtonStack({
  session,
  active,
  deactivate,
  remove,
}) {
  return (
    <Container className="mb-2">
      <Row>
        <Col xl={10} sm={8} xs={6}></Col>
        <Col>
          <Stack direction="horizontal" gap={3}>
            {active && (
              <SessionEndButtonModal
                deactivate={deactivate}
                title={"End a Session"}
              ></SessionEndButtonModal>
            )}
            <SessionEditButtonModal
              session={session}
              title={"Edit Session"}
            ></SessionEditButtonModal>
            <DeleteButton
              remove={remove}
              title={"Delete Session"}
            ></DeleteButton>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}
