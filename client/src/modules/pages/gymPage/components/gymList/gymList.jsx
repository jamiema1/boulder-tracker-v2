import React from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Accordion from "react-bootstrap/Accordion"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Stack from "react-bootstrap/Stack"

import axios from "modules/api/axios"
import {gymEndpoint, handleError} from "modules/api/endpoints"

import AddButtonModal from "modules/common/components/buttons/addButtonModal"
import DeleteButtonModal from "modules/common/components/buttons/deleteButtonModal"
import EditButtonModal from "modules/common/components/buttons/editButtonModal"

import GymAddForm from "modules/pages/gymPage/components/gymList/components/gymAddForm"
import GymEditForm from "modules/pages/gymPage/components/gymList/components/gymEditForm"
import GymInfo from "modules/pages/gymPage/components/gymList/components/gymInfo"
import LocationList from "modules/pages/gymPage/components/locationList/locationList"

export default function GymList() {
  /*
   * React Query Hooks & APIs
   */

  const queryClient = useQueryClient()

  const {
    isLoading: isLoadingGym,
    isError: isErrorGym,
    data: allGymData,
    error: errorGym,
  } = useQuery(gymEndpoint, () => axios.get(gymEndpoint), {
    onError: (error) => handleError(error),
  })

  const deleteGym = useMutation(
    (gymId) => axios.delete(gymEndpoint + "/" + gymId),
    {
      onSuccess: (data, gymId) => {
        queryClient.setQueryData(gymEndpoint, {
          data: {
            data: [...allGymData.data.data].filter((gym) => {
              return gym.id !== gymId
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

  if (isLoadingGym) {
    return <div>Loading...</div>
  }

  if (isErrorGym) {
    return (
      <div>
        Error: {errorGym.message} | {errorGym.response.data.error}
      </div>
    )
  }

  return (
    <Container>
      <Row className="mb-3 ">
        <Col className="text-end">
          <AddButtonModal
            title={"Add Gym"}
            form={<GymAddForm></GymAddForm>}
          ></AddButtonModal>
        </Col>
      </Row>
      <Row>
        <Accordion defaultActiveKey={0}>
          {[...allGymData.data.data].map((gym) => {
            return (
              <Accordion.Item eventKey={gym.id} key={gym.id} className="mb-3">
                <Accordion.Header>
                  <GymInfo gym={gym}></GymInfo>
                </Accordion.Header>
                <Accordion.Body>
                  <Stack direction="horizontal" gap={3}>
                    <EditButtonModal
                      title={"Edit Gym"}
                      form={<GymEditForm gym={gym}></GymEditForm>}
                    ></EditButtonModal>
                    <DeleteButtonModal
                      confirmAction={() => deleteGym.mutate(gym.id)}
                      title={"Delete Gym"}
                    ></DeleteButtonModal>
                  </Stack>
                  <LocationList gym={gym}></LocationList>
                </Accordion.Body>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </Row>
    </Container>
  )
}
