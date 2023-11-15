import React from "react"

import {useQuery} from "react-query"

import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Stack from "react-bootstrap/Stack"

import axios from "modules/api/axios"
import {boulderEndpoint} from "modules/api/endpoints"

import {getBoulderTypeImage, getHexImage} from "modules/images/images"

export default function ClimbInfo({climb}) {
  const {isLoading: isLoadingBoulder, data: allBoulderData} = useQuery(
    boulderEndpoint,
    () => axios.get(boulderEndpoint)
  )

  // TODO: Make the loading look nicer
  if (isLoadingBoulder) {
    return <div>Loading...</div>
  }

  const boulder = allBoulderData.data.data.find((boulder) => {
    return parseInt(boulder.id) === parseInt(climb.boulderId)
  })

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
        <Col xs={6} md={10}>
          <Stack>
            <div className="text">
              {climb.sends} / {climb.attempts}
            </div>
            <div className="text">{boulder.description}</div>
          </Stack>
          {/* <div className="text">
    {convertToViewDateTime(
      climb.climbStartTime,
      climb.climbEndTime
    )}
  </div> */}
        </Col>
      </Row>
    </Container>
  )
}
