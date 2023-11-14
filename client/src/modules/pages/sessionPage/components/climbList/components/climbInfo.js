import images from "modules/images/images"
import React from "react"
import Container from "react-bootstrap/esm/Container.js"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Stack from "react-bootstrap/Stack"
import {boulderEndpoint} from "modules/api/endpoints"
import {useQuery} from "react-query"
import axios from "modules/api/axios"

export default function ClimbInfo({climb}) {
  const {isLoading: isLoadingBoulder, data: allBoulderData} = useQuery(
    boulderEndpoint,
    () => axios.get(boulderEndpoint)
  )

  // TODO: Make the loading look nicer
  if (isLoadingBoulder) {
    return <div>Loading...</div>
  }

  function boulderText(climb) {
    const boulder = allBoulderData.data.data.find((boulder) => {
      return parseInt(boulder.id) === parseInt(climb.boulderId)
    })

    if (boulder === undefined) {
      return
    }

    return boulder.description
  }

  function getBoulderColour(climb) {
    const boulder = allBoulderData.data.data.find((boulder) => {
      return parseInt(boulder.id) === parseInt(climb.boulderId)
    })

    if (boulder === undefined) {
      return
    }

    return boulder.colour
  }

  function getBoulderRating(climb) {
    const boulder = allBoulderData.data.data.find((boulder) => {
      return parseInt(boulder.id) === parseInt(climb.boulderId)
    })

    if (boulder === undefined) {
      return
    }

    return boulder.rating
  }

  function getHexImage(rating) {
    switch (rating) {
    case -1:
      return images.unrated
    case 0:
      return images.sixHex
    case 1:
      return images.oneHex
    case 2:
      return images.twoHex
    case 3:
      return images.threeHex
    case 4:
      return images.fourHex
    case 5:
      return images.fiveHex
    case 6:
      return images.sixHex
    }
  }

  function getBoulderType(climb) {
    const boulder = allBoulderData.data.data.find((boulder) => {
      return parseInt(boulder.id) === parseInt(climb.boulderId)
    })

    if (boulder === undefined) {
      return
    }

    return boulder.boulderType
  }

  function getBoulderTypeImage(boulderType) {
    switch (boulderType) {
    case "Slab":
      return images.slab
    case "Overhang":
      return images.overhang
    }
  }
  return (
    <Container>
      <Row>
        <Col
          // xs={1}
          className="p-0"
          style={{backgroundColor: getBoulderColour(climb)}}
        ></Col>
        <Col className="p-1">
          <img
            className="climbIcons"
            src={getHexImage(getBoulderRating(climb))}
          ></img>
        </Col>
        <Col className="p-1">
          <img
            className="climbIcons"
            src={getBoulderTypeImage(getBoulderType(climb))}
          ></img>
        </Col>
        <Col xs={6} md={10}>
          <Stack>
            <div className="text">
              {climb.sends} / {climb.attempts}
            </div>
            <div className="text">{boulderText(climb)}</div>
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
