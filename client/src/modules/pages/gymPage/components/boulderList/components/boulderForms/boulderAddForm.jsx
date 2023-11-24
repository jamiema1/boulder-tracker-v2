import React, {useRef} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Form from "react-bootstrap/Form"

import axios from "modules/api/axios"
import {boulderEndpoint, handleError} from "modules/api/endpoints"

// import {
//   convertToEditDateTime,
//   getCurrentDateTime,
// } from "modules/common/helpers"
import AddingButtonStack from "modules/common/components/addingButtonStack"

export default function BoulderAddForm({handleClose, location}) {
  /*
   * React Hooks:
   *
   * Refs:
   *  - newBoulderId: reference to new boulder ID
   *  - newBoulderStartTime: reference to new start time
   *  - newBoulderEndTime: reference to new end time
   */

  const boulderRatingRef = useRef(0)
  const boulderColourRef = useRef("")
  const boulderBoulderTypeRef = useRef("")
  const boulderDescriptionRef = useRef("")
  const boulderSetStartDateRef = useRef("")
  const boulderSetEndDateRef = useRef("")

  const queryClient = useQueryClient()

  const {isLoading: isLoadingBoulder, data: allBoulderData} = useQuery(
    boulderEndpoint,
    () => axios.get(boulderEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  const addBoulder = useMutation(
    (newSession) => axios.post(boulderEndpoint, newSession),
    {
      onSuccess: (data, newSession) => {
        queryClient.setQueryData(boulderEndpoint, {
          data: {
            data: [
              ...allBoulderData.data.data,
              {id: data.data.data[0].id, ...newSession},
            ],
          },
        })
      },

      onError: (error) => handleError(error),
    }
  )

  if (isLoadingBoulder) {
    return <div>Loading...</div>
  }

  return (
    <Form>
      {/* <BoulderStartTimeInput
        defaultValue={convertToEditDateTime(getCurrentDateTime())}
        ref={boulderStartTimeRef}
      ></BoulderStartTimeInput> */}
      <AddingButtonStack
        confirm={() => {
          handleClose()
          addBoulder.mutate({
            locationId: parseInt(location.id),
            rating: parseInt(boulderRatingRef.current.value),
            colour: boulderColourRef.current.value,
            boulderType: boulderBoulderTypeRef.current.value,
            description: boulderDescriptionRef.current.value,
            setStartDate: boulderSetStartDateRef.current.value,
            setEndDate: boulderSetEndDateRef.current.value,
          })
        }}
        cancel={() => {
          handleClose()
        }}
      ></AddingButtonStack>
    </Form>
  )
}
