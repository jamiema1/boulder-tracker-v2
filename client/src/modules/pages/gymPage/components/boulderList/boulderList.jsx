import React from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Accordion from "react-bootstrap/Accordion"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Stack from "react-bootstrap/Stack"

import axios from "modules/api/axios"
import {boulderEndpoint, handleError} from "modules/api/endpoints"

import AddButtonModal from "modules/common/components/addButtonModal"
import DeleteButtonModal from "modules/common/components/deleteButtonModal"
import EditButtonModal from "modules/common/components/editButtonModal"

import BoulderAddForm from "modules/pages/gymPage/components/boulderList/components/boulderForms/boulderAddForm"
import BoulderEditForm from "modules/pages/gymPage/components/boulderList/components/boulderForms/boulderEditForm"
import BoulderInfo from "modules/pages/gymPage/components/boulderList/components/boulderInfo"

export default function BoulderList({location}) {
  /*
   * React Query Hooks & APIs
   */

  const queryClient = useQueryClient()

  const {
    isLoading: isLoadingBoulder,
    isError: isErrorBoulder,
    data: allBoulderData,
    error: errorBoulder,
  } = useQuery(boulderEndpoint, () => axios.get(boulderEndpoint), {
    onError: (error) => handleError(error),
  })

  const deleteBoulder = useMutation(
    (boulderId) => axios.delete(boulderEndpoint + "/" + boulderId),
    {
      onSuccess: (data, boulderId) => {
        queryClient.setQueryData(boulderEndpoint, {
          data: {
            data: [...allBoulderData.data.data].filter((boulder) => {
              return boulder.id !== boulderId
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

  if (isLoadingBoulder) {
    return <div>Loading...</div>
  }

  if (isErrorBoulder) {
    return (
      <div>
        Error: {errorBoulder.message} | {errorBoulder.response.data.error}
      </div>
    )
  }

  const filteredBoulderData = [...allBoulderData.data.data]
    .filter((boulder) => boulder.locationId === location.id)
    .reverse()

  return (
    <Container>
      <Row className="mb-3 ">
        <Col className="text-end">
          <AddButtonModal
            title={"Add Boulder"}
            form={<BoulderAddForm location={location}></BoulderAddForm>}
          ></AddButtonModal>
        </Col>
      </Row>
      <Row>
        <Accordion defaultActiveKey={0}>
          {filteredBoulderData.map((boulder) => {
            return (
              <Accordion.Item
                eventKey={boulder.id}
                key={boulder.id}
                className="mb-3"
              >
                <Accordion.Header>
                  <BoulderInfo boulder={boulder}></BoulderInfo>
                </Accordion.Header>
                <Accordion.Body>
                  <Stack direction="horizontal" gap={3}>
                    <EditButtonModal
                      title={"Edit Boulder"}
                      form={
                        <BoulderEditForm
                          boulder={boulder}
                          location={location}
                        ></BoulderEditForm>
                      }
                    ></EditButtonModal>
                    <DeleteButtonModal
                      confirmAction={() => deleteBoulder.mutate(boulder.id)}
                      title={"Delete Boulder"}
                    ></DeleteButtonModal>
                  </Stack>
                  {/* <BoulderList boulder={boulder}></BoulderList> */}
                </Accordion.Body>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </Row>
    </Container>
  )
}
