import React from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Accordion from "react-bootstrap/Accordion"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Stack from "react-bootstrap/Stack"

import axios from "modules/api/axios"
import {climbEndpoint, handleError} from "modules/api/endpoints"

import AddButtonModal from "modules/common/components/addButtonModal"
import DeleteButtonModal from "modules/common/components/deleteButtonModal"
import EditButtonModal from "modules/common/components/editButtonModal"

import ClimbAddForm from "modules/pages/sessionPage/components/climbList/components/climbForms/climbAddForm"
import ClimbEditForm from "modules/pages/sessionPage/components/climbList/components/climbForms/climbEditForm"
import ClimbInfo from "modules/pages/sessionPage/components/climbList/components/climbInfo"

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
          <AddButtonModal
            title={"Add Climb"}
            form={<ClimbAddForm session={session}></ClimbAddForm>}
          ></AddButtonModal>
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
                  <Stack direction="horizontal" gap={3}>
                    <EditButtonModal
                      title={"Edit Climb"}
                      form={
                        <ClimbEditForm
                          climb={climb}
                          session={session}
                        ></ClimbEditForm>
                      }
                    ></EditButtonModal>
                    <DeleteButtonModal
                      confirmAction={() => deleteClimb.mutate(climb.id)}
                      title={"Delete Climb"}
                    ></DeleteButtonModal>
                  </Stack>
                </Accordion.Body>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </Row>
    </Container>
  )
}
