import React, {useRef} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Form from "react-bootstrap/Form"

import axios from "modules/api/axios"
import {gymEndpoint, handleError} from "modules/api/endpoints"

import AddingButtonStack from "modules/common/components/addingButtonStack"

import GymNameInput from "modules/pages/gymPage/components/gymList/components/climbForms/components/gymNameInput"
import GymAddressInput from "modules/pages/gymPage/components/gymList/components/climbForms/components/gymAddressInput"
import GymCityInput from "modules/pages/gymPage/components/gymList/components/climbForms/components/gymCityInput"

export default function GymAddForm({handleClose}) {
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

  const addGym = useMutation(
    (newSession) => axios.post(gymEndpoint, newSession),
    {
      onSuccess: (data, newSession) => {
        queryClient.setQueryData(gymEndpoint, {
          data: {
            data: [
              ...allGymData.data.data,
              {id: data.data.data[0].id, ...newSession},
            ],
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
      <GymNameInput ref={gymNameRef}></GymNameInput>
      <GymAddressInput ref={gymAddressRef}></GymAddressInput>
      <GymCityInput ref={gymCityRef}></GymCityInput>
      <AddingButtonStack
        confirm={() => {
          handleClose()
          addGym.mutate({
            name: gymNameRef.current.value,
            address: gymAddressRef.current.value,
            city: gymCityRef.current.value,
          })
        }}
        cancel={() => {
          handleClose()
        }}
      ></AddingButtonStack>
    </Form>
  )
}
