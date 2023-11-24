import React, {useRef} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Form from "react-bootstrap/Form"

import axios from "modules/api/axios"
import {locationEndpoint, handleError} from "modules/api/endpoints"

import AddingButtonStack from "modules/common/components/addingButtonStack"

import LocationNameInput from "modules/pages/gymPage/components/locationList/components/locationForms/components/locationNameInput"

export default function LocationAddForm({handleClose, gym}) {
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

  const addLocation = useMutation(
    (newSession) => axios.post(locationEndpoint, newSession),
    {
      onSuccess: (data, newSession) => {
        queryClient.setQueryData(locationEndpoint, {
          data: {
            data: [
              ...allLocationData.data.data,
              {id: data.data.data[0].id, ...newSession},
            ],
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
      <LocationNameInput ref={locationNameRef}></LocationNameInput>
      <AddingButtonStack
        confirm={() => {
          handleClose()
          addLocation.mutate({
            gymId: parseInt(gym.id),
            name: locationNameRef.current.value,
          })
        }}
        cancel={() => {
          handleClose()
        }}
      ></AddingButtonStack>
    </Form>
  )
}