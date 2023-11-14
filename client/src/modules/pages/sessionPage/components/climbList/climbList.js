/* eslint-disable max-lines */
import React from "react"
// import {convertToEditDateTime} from "modules/common/helpers.js"
// import images from "modules/images/images.js"
import {climbEndpoint, handleError} from "modules/api/endpoints.js"
import Accordion from "react-bootstrap/Accordion"
import Container from "react-bootstrap/esm/Container.js"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
// import FloatingLabel from "react-bootstrap/FloatingLabel"
import ClimbAddButtonModal from "./components/climbForms/components/climbAddButtonModal"

import {useQuery} from "react-query"
import ClimbInfo from "./components/climbInfo"
import axios from "modules/api/axios"

export default function ClimbList({session}) {
  /*
   * React Query Hooks & APIs
   */

  const {
    isLoading: isLoadingClimb,
    isError: isErrorClimb,
    data: allClimbData,
    error: errorClimb,
  } = useQuery(climbEndpoint, () => axios.get(climbEndpoint), {
    onError: (error) => handleError(error),
  })

  /*
   * Helper functions
   */

  /*
   * Return value
   */

  if (isLoadingClimb) {
    return <div>Loading...</div>
  }

  if (isErrorClimb) {
    return (
      <div>
        Error: {errorClimb.message} | {errorClimb.response.data.error}
      </div>
    )
  }

  const filteredClimbData = [...allClimbData.data.data]
    .filter((climb) => climb.sessionId === session.id)
    .reverse()

  return (
    <Container>
      <Row className="mb-3 ">
        <Col className="text-end">
          <ClimbAddButtonModal
            title={"Add a Climb"}
            session={session}
          ></ClimbAddButtonModal>
        </Col>
      </Row>
      <Row>
        <Accordion defaultActiveKey={0}>
          {filteredClimbData.map((climb) => {
            return (
              <Accordion.Item
                eventKey={climb.id}
                key={climb.id}
                className="mb-3"
              >
                <Accordion.Header>
                  <ClimbInfo climb={climb}></ClimbInfo>
                </Accordion.Header>
                {/* <Accordion.Header>
                  <Form></Form>
                </Accordion.Header>
                <Accordion.Body className="px-2 accordionBody">
                  <Container>
                    <Row>
                      <Col xl={10} sm={8} xs={6}></Col>
                      <Col>
                        <Stack direction="horizontal" gap={3}>
                          <Button
                            variant="warning"
                            onClick={() => {
                              loadInitialBoulders(
                                props.sessionStartTime,
                                props.sessionEndTime
                              )
                            }}
                          >
                            <img src={images.editIcon}></img>
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => deleteClimb(climb.id)}
                          >
                            <img src={images.deleteIcon}></img>
                          </Button>
                        </Stack>
                      </Col>
                    </Row>
                  </Container>
                </Accordion.Body> */}
              </Accordion.Item>
            )
          })}
        </Accordion>
      </Row>
    </Container>
  )
}
