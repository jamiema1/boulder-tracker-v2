import React from "react"
import {climbEndpoint, handleError} from "modules/api/endpoints.js"
import Accordion from "react-bootstrap/Accordion"
import Container from "react-bootstrap/esm/Container.js"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ClimbAddButtonModal from "./components/climbForms/components/climbAddButtonModal"

import {useMutation, useQuery, useQueryClient} from "react-query"
import ClimbInfo from "./components/climbInfo"
import axios from "modules/api/axios"
import ClimbViewButtonStack from "./components/climbViewButtonStack"

export default function ClimbList({session}) {
  /*
   * React Query Hooks & APIs
   */

  const queryClient = useQueryClient()

  const {
    isLoading: isLoadingClimb,
    isError: isErrorClimb,
    data: allClimbData,
    error: errorClimb,
  } = useQuery(climbEndpoint, () => axios.get(climbEndpoint), {
    onError: (error) => handleError(error),
  })

  // const editClimb = useMutation(
  //   ({climbId, newClimb}) =>
  //     axios.put(climbEndpoint + "/" + climbId, newClimb),
  //   {
  //     onSuccess: (data, {climbId, newClimb}) => {
  //       queryClient.setQueryData(climbEndpoint, {
  //         data: {
  //           data: [...allClimbData.data.data].map((climb) => {
  //            return climb.id === climbId ? {id: climbId, ...newClimb} : climb
  //           }),
  //         },
  //       })
  //     },
  //     onError: (error) => handleError(error),
  //   }
  // )

  const deleteClimb = useMutation(
    (climbId) => axios.delete(climbEndpoint + "/" + climbId),
    {
      onSuccess: (data, climbId) => {
        queryClient.setQueryData(climbEndpoint, {
          data: {
            data: [...allClimbData.data.data].filter((climb) => {
              return climb.id !== climbId
            }),
          },
        })
      },
      onError: (error) => handleError(error),
    }
  )

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
                <Accordion.Body>
                  <ClimbViewButtonStack
                    climb={climb}
                    remove={() => deleteClimb.mutate(climb.id)}
                  ></ClimbViewButtonStack>
                </Accordion.Body>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </Row>
    </Container>
  )
}
