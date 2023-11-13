import React from "react"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {getTimeDifferenceString} from "modules/common/helpers.js"
import {useQuery} from "react-query"
import {
  boulderEndpoint,
  climbEndpoint,
  gymEndpoint,
  handleError,
} from "api/endpoints"
import axios from "api/axios"

export default function SessionInfo({session}) {
  const {isLoading: isLoadingGym, data: allGymData} = useQuery(
    gymEndpoint,
    () => axios.get(gymEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  const {isLoading: isLoadingBoulder, data: allBoulderData} = useQuery(
    boulderEndpoint,
    () => axios.get(boulderEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  const {isLoading: isLoadingClimb, data: allClimbData} = useQuery(
    climbEndpoint,
    () => axios.get(climbEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )
  function climbText(session) {
    const filteredClimbData = [...allClimbData.data.data].filter((climb) => {
      return parseInt(climb.sessionId) === parseInt(session.id)
    })

    let climbs = 0
    let attempts = 0
    let sends = 0
    let weightedRating = 0
    let weightedAttempts = 0
    filteredClimbData.forEach((climb) => {
      const boulder = [...allBoulderData.data.data].find((boulder) => {
        return parseInt(boulder.id) === parseInt(climb.boulderId)
      })

      if (boulder === undefined) return

      // TODO: Change for unrated boulders
      if (boulder.rating != -1) {
        weightedRating += boulder.rating * climb.attempts
        weightedAttempts += climb.attempts
      }
      climbs += 1
      attempts += climb.attempts
      sends += climb.sends
    })

    weightedRating = Math.round((weightedRating / weightedAttempts) * 10) / 10

    return (
      <Stack gap={3}>
        <div className="text-end">{climbs} Climbs</div>
        <div className="text-end">{attempts} Attempts</div>
        <div className="text-end">{sends} Sends</div>
        <div className="text-end">{weightedRating} Rating</div>
      </Stack>
    )
  }

  if (isLoadingGym || isLoadingBoulder || isLoadingClimb) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Row>
        <Col className="p-0">
          <Stack gap={3}>
            <div>{new Date(session.sessionStartTime).toLocaleDateString()}</div>
            <div>
              {
                allGymData.data.data.find((gym) => {
                  return parseInt(gym.id) === parseInt(session.gymId)
                })?.city
              }
            </div>
            <div>
              {getTimeDifferenceString(
                session.sessionStartTime,
                session.sessionEndTime
              )}
            </div>
          </Stack>
        </Col>
        <Col>{climbText(session)}</Col>
      </Row>
    </Container>
  )
}
