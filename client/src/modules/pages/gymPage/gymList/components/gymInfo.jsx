import React from "react"

import {useQuery} from "react-query"

import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Stack from "react-bootstrap/Stack"

import axios from "modules/api/axios"
import {
  boulderEndpoint,
  handleError,
  locationEndpoint,
  sessionEndpoint,
} from "modules/api/endpoints"
import {convertToEditDate} from "modules/common/helpers"
import {nullDate} from "modules/common/constants"

export default function GymInfo({gym}) {
  /*
   * React Query Hooks & APIs
   */

  const {isLoading: isLoadingSession, data: allSessionData} = useQuery(
    sessionEndpoint,
    () => axios.get(sessionEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  const {isLoading: isLoadingLocation, data: allLocationData} = useQuery(
    locationEndpoint,
    () => axios.get(locationEndpoint)
  )

  const {isLoading: isLoadingBoulder, data: allBoulderData} = useQuery(
    boulderEndpoint,
    () => axios.get(boulderEndpoint)
  )

  /*
   * Helper Functions
   */

  function visits() {
    return [...allSessionData.data.data].filter(
      (session) => parseInt(session.gymId) == parseInt(gym.id)
    ).length
  }

  function mostRecentVisit() {
    return [...allSessionData.data.data]
      .filter((session) => parseInt(session.gymId) == parseInt(gym.id))
      .reduce((mostRecentDate, date) => {
        if (
          mostRecentDate == nullDate ||
          new Date(date.sessionStartTime) > new Date(mostRecentDate)
        ) {
          return date.sessionStartTime
        }
        return mostRecentDate
      }, nullDate)
  }

  function activeBoulders() {
    return filteredBoulderData.length
  }

  /*
   * Return Value
   */

  if (isLoadingSession || isLoadingLocation || isLoadingBoulder) {
    return <div>Loading...</div>
  }

  const filteredLocationData = [...allLocationData.data.data].filter(
    (location) => parseInt(location.gymId) == parseInt(gym.id)
  )

  const filteredBoulderData = [...allBoulderData.data.data].filter(
    (boulder) => {
      const containsLocation = filteredLocationData.reduce((total, curr) => {
        return total || curr.id == boulder.locationId
      }, false)
      const setStartBeforeSession = new Date() > new Date(boulder.setStartDate)
      const setEndedAfterSession =
        new Date() < new Date(boulder.setEndDate) ||
        boulder.setEndDate == nullDate
      return containsLocation && setStartBeforeSession && setEndedAfterSession
    }
  )

  return (
    <Container>
      <Row>
        <Col className="px-0">
          <Stack gap={3}>
            <div>{gym.name}</div>
            <div>{gym.city}</div>
            <div>{gym.address}</div>
          </Stack>
        </Col>
        <Col className="text-end">
          <Stack gap={3}>
            <div>
              {"Last Visited: "}
              {convertToEditDate(mostRecentVisit())}
            </div>
            <div>
              {visits()}
              {" visits"}
            </div>
            <div>
              {activeBoulders()}
              {" active boulders"}
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}
