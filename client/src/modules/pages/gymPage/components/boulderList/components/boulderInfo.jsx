import React from "react"

import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"

import {getBoulderTypeImage, getHexImage} from "modules/images/images"

export default function BoulderInfo({boulder}) {
  return (
    <Container>
      <Row>
        <Col className="p-0" style={{backgroundColor: boulder.colour}}></Col>
        <Col className="p-1">
          <img className="climbIcons" src={getHexImage(boulder.rating)}></img>
        </Col>
        <Col className="p-1">
          <img
            className="climbIcons"
            src={getBoulderTypeImage(boulder.boulderType)}
          ></img>
        </Col>
        <Col xs={6} md={10} className="text-end">
          <div>{boulder.description}</div>
        </Col>
      </Row>
    </Container>
  )
}
