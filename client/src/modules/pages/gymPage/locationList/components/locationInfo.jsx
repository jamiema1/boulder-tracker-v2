import React from "react"

import {useQuery} from "react-query"

import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"

import axios from "modules/api/axios"
import {boulderEndpoint} from "modules/api/endpoints"
import {nullDate} from "modules/common/constants"

export default function LocationInfo({location}) {
  const {isLoading: isLoadingBoulder, data: allBoulderData} = useQuery(
    boulderEndpoint,
    () => axios.get(boulderEndpoint)
  )

  // TODO: Make the loading look nicer
  if (isLoadingBoulder) {
    return <div>Loading...</div>
  }

  const filteredBoulderData = [...allBoulderData.data.data].filter(
    (boulder) =>
      boulder.locationId === location.id && boulder.setEndDate === nullDate
  )

  return (
    <Container>
      <Row>
        <Col>
          <div>{location.name}</div>
        </Col>
        <Col className="text-end">
          <div>{filteredBoulderData.length} active boulder(s)</div>
        </Col>
      </Row>
    </Container>
  )
}
