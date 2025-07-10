import React, {useEffect, useState} from "react"
import {get, climbEndpoint} from "../../api/endpoints.js"
import Accordion from "react-bootstrap/Accordion"
import Container from "react-bootstrap/esm/Container.js"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {convertToViewDateTime} from "../../common/helpers.js"

export default function Climbs(props) {
  const [climbData, setClimbData] = useState([])
  const [allClimbData, setAllClimbData] = useState([])

  useEffect(() => {
    getAllClimbs()
  }, [])

  useEffect(() => {
    setClimbData(
      allClimbData.filter(
        (climb) => parseInt(climb.boulderId) === parseInt(props.boulderId)
      )
    )
  }, [allClimbData])

  function getAllClimbs() {
    get(
      climbEndpoint,
      props.climbDataCentral,
      props.setClimbDataCentral,
      setAllClimbData
    )
  }

  return (
    <Container>
      <Row>
        <Accordion defaultActiveKey={0}>
          {[...climbData].reverse().map((climb) => {
            return (
              <Accordion.Item
                eventKey={climb.id}
                key={climb.id}
                className="mb-3"
              >
                <Accordion.Button disabled>
                  <Container>
                    <Row>
                      <Col>
                        {climb.sends} / {climb.attempts}
                      </Col>
                      <Col className="text-end">
                        {
                          convertToViewDateTime(
                            climb.climbStartTime,
                            climb.climbEndTime
                          ).split(",")[0]
                        }
                      </Col>
                    </Row>
                  </Container>
                </Accordion.Button>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </Row>
    </Container>
  )
}
