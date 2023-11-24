import React from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Accordion from "react-bootstrap/Accordion"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Stack from "react-bootstrap/Stack"

import axios from "modules/api/axios"
import {locationEndpoint, handleError} from "modules/api/endpoints"

import AddButtonModal from "modules/common/components/addButtonModal"
import DeleteButtonModal from "modules/common/components/deleteButtonModal"
import EditButtonModal from "modules/common/components/editButtonModal"

import LocationAddForm from "modules/pages/gymPage/components/locationList/components/locationForms/locationAddForm"
import LocationEditForm from "modules/pages/gymPage/components/locationList/components/locationForms/locationEditForm"
import LocationInfo from "modules/pages/gymPage/components/locationList/components/locationInfo"
import BoulderList from "modules/pages/gymPage/components/boulderList/boulderList"

export default function LocationList({gym}) {
  /*
   * React Query Hooks & APIs
   */

  const queryClient = useQueryClient()

  const {
    isLoading: isLoadingLocation,
    isError: isErrorLocation,
    data: allLocationData,
    error: errorLocation,
  } = useQuery(locationEndpoint, () => axios.get(locationEndpoint), {
    onError: (error) => handleError(error),
  })

  const deleteLocation = useMutation(
    (locationId) => axios.delete(locationEndpoint + "/" + locationId),
    {
      onSuccess: (data, locationId) => {
        queryClient.setQueryData(locationEndpoint, {
          data: {
            data: [...allLocationData.data.data].filter((location) => {
              return location.id !== locationId
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

  if (isLoadingLocation) {
    return <div>Loading...</div>
  }

  if (isErrorLocation) {
    return (
      <div>
        Error: {errorLocation.message} | {errorLocation.response.data.error}
      </div>
    )
  }

  const filteredLocationData = [...allLocationData.data.data].filter(
    (location) => location.gymId === gym.id
  )

  return (
    <Container>
      <Row className="mb-3 ">
        <Col className="text-end">
          <AddButtonModal
            title={"Add Location"}
            form={<LocationAddForm gym={gym}></LocationAddForm>}
          ></AddButtonModal>
        </Col>
      </Row>
      <Row>
        <Accordion defaultActiveKey={0}>
          {filteredLocationData.map((location) => {
            return (
              <Accordion.Item
                eventKey={location.id}
                key={location.id}
                className="mb-3"
              >
                <Accordion.Header>
                  <LocationInfo location={location}></LocationInfo>
                </Accordion.Header>
                <Accordion.Body>
                  <Stack direction="horizontal" gap={3}>
                    <EditButtonModal
                      title={"Edit Location"}
                      form={
                        <LocationEditForm
                          location={location}
                          gym={gym}
                        ></LocationEditForm>
                      }
                    ></EditButtonModal>
                    <DeleteButtonModal
                      confirmAction={() => deleteLocation.mutate(location.id)}
                      title={"Delete Location"}
                    ></DeleteButtonModal>
                  </Stack>
                  <BoulderList location={location}></BoulderList>
                </Accordion.Body>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </Row>
    </Container>
  )
}
