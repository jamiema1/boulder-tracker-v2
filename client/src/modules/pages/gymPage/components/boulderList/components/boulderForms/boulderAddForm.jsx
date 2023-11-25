import React, {useRef} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Form from "react-bootstrap/Form"

import axios from "modules/api/axios"
import {boulderEndpoint, handleError} from "modules/api/endpoints"

import {
  convertToEditDate,
  getCurrentDate,
  nullDate,
} from "modules/common/helpers"
import AddingButtonStack from "modules/common/components/addingButtonStack"
import BoulderSetStartDateInput from "./components/boulderSetStartDateInput"
import BoulderSetEndDateInput from "./components/boulderSetEndDateInput"
import BoulderRatingInput from "./components/boulderRatingInput"
import BoulderColourInput from "./components/boulderColourInput"
import BoulderBoulderTypeInput from "./components/boulderBoulderTypeInput"
import BoulderDescriptionInput from "./components/boulderDescriptionInput"

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
      <BoulderRatingInput ref={boulderRatingRef} />
      <BoulderColourInput ref={boulderColourRef} />
      <BoulderBoulderTypeInput ref={boulderBoulderTypeRef} />
      <BoulderDescriptionInput ref={boulderDescriptionRef} />
      <BoulderSetStartDateInput
        defaultValue={convertToEditDate(getCurrentDate())}
        ref={boulderSetStartDateRef}
      />
      <BoulderSetEndDateInput ref={boulderSetEndDateRef} />
      <AddingButtonStack
        confirm={() => {
          handleClose()
          console.log(boulderSetEndDateRef.current.value)
          addBoulder.mutate({
            locationId: parseInt(location.id),
            rating: parseInt(boulderRatingRef.current.value),
            colour: boulderColourRef.current.value,
            boulderType: boulderBoulderTypeRef.current.value,
            description: boulderDescriptionRef.current.value,
            setStartDate: boulderSetStartDateRef.current.value,
            setEndDate:
              boulderSetEndDateRef.current.value === ""
                ? nullDate
                : boulderSetEndDateRef.current.value,
          })
        }}
        cancel={() => {
          handleClose()
        }}
      ></AddingButtonStack>
    </Form>
  )
}
