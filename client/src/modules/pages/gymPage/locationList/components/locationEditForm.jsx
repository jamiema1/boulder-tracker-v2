import React, {useRef} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Form from "react-bootstrap/Form"

import axios from "modules/api/axios"
import {locationEndpoint, handleError} from "modules/api/endpoints"

import EditingButtonStack from "modules/common/components/buttons/editingButtonStack"

import TextInput from "modules/common/components/inputs/textInput"

export default function LocationEditForm({gym, location, handleClose}) {
  /*
   * React Hooks:
   *
   * Refs:
   *  - newLocationName: reference to new name
   */

  const locationNameRef = useRef("")

  const queryClient = useQueryClient()

  const {isLoading: isLoadingLocation, data: allLocationData} = useQuery(
    locationEndpoint,
    () => axios.get(locationEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  const editLocation = useMutation(
    ({locationId, newLocation}) =>
      axios.put(locationEndpoint + "/" + locationId, newLocation),
    {
      onSuccess: (data, {locationId, newLocation}) => {
        queryClient.setQueryData(locationEndpoint, {
          data: {
            data: [...allLocationData.data.data].map((location) => {
              return location.id === locationId
                ? {id: locationId, ...newLocation}
                : location
            }),
          },
        })
      },
      onError: (error) => handleError(error),
    }
  )

  if (isLoadingLocation) {
    return <div>Loading...</div>
  }

  return (
    <Form>
      <TextInput
        ref={locationNameRef}
        defaultValue={location.name}
        controlId="NameInput"
        label="Name"
      />
      <EditingButtonStack
        confirm={() => {
          editLocation.mutate({
            locationId: location.id,
            newLocation: {
              gymId: parseInt(gym.id),
              name: locationNameRef.current.value,
            },
          })
          handleClose()
        }}
        cancel={() => {
          handleClose()
        }}
      ></EditingButtonStack>
    </Form>
  )
}
