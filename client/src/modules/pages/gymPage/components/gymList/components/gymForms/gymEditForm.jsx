import React, {useRef} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Form from "react-bootstrap/Form"

import axios from "modules/api/axios"
import {gymEndpoint, handleError} from "modules/api/endpoints"

import EditingButtonStack from "modules/common/components/editingButtonStack"

import GymNameInput from "modules/pages/gymPage/components/gymList/components/gymForms/components/gymNameInput"
import GymAddressInput from "modules/pages/gymPage/components/gymList/components/gymForms/components/gymAddressInput"
import GymCityInput from "modules/pages/gymPage/components/gymList/components/gymForms/components/gymCityInput"

export default function GymEditForm({gym, handleClose}) {
  /*
   * React Hooks:
   *
   * Refs:
   *  - gymNameRef: reference to new name
   *  - gymAddressRef: reference to new address
   *  - gymCityRef: reference to new city
   */

  const gymNameRef = useRef("")
  const gymAddressRef = useRef("")
  const gymCityRef = useRef("")

  const queryClient = useQueryClient()

  const {isLoading: isLoadingGym, data: allGymData} = useQuery(
    gymEndpoint,
    () => axios.get(gymEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  const editGym = useMutation(
    ({gymId, newGym}) => axios.put(gymEndpoint + "/" + gymId, newGym),
    {
      onSuccess: (data, {gymId, newGym}) => {
        queryClient.setQueryData(gymEndpoint, {
          data: {
            data: [...allGymData.data.data].map((gym) => {
              return gym.id === gymId ? {id: gymId, ...newGym} : gym
            }),
          },
        })
      },
      onError: (error) => handleError(error),
    }
  )

  if (isLoadingGym) {
    return <div>Loading...</div>
  }

  return (
    <Form>
      <GymNameInput ref={gymNameRef} defaultValue={gym.name}></GymNameInput>
      <GymAddressInput
        ref={gymAddressRef}
        defaultValue={gym.address}
      ></GymAddressInput>
      <GymCityInput ref={gymCityRef} defaultValue={gym.city}></GymCityInput>

      <EditingButtonStack
        confirm={() => {
          editGym.mutate({
            gymId: gym.id,
            newGym: {
              name: gymNameRef.current.value,
              address: gymAddressRef.current.value,
              city: gymCityRef.current.value,
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
