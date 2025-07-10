import React, {useRef} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Form from "react-bootstrap/Form"

import axios from "modules/api/axios"
import {boulderEndpoint, handleError} from "modules/api/endpoints"

import {
  BOULDER_TYPE,
  COLOURS,
  RATINGS,
  nullDate,
} from "modules/common/constants"
import {convertToEditDate, currentDate} from "modules/common/helpers"
import AddingButtonStack from "modules/common/components/buttons/addingButtonStack"
import DateInput from "modules/common/components/inputs/dateInput"
import TextInput from "modules/common/components/inputs/textInput"
import ChoiceInput from "modules/common/components/inputs/choiceInput"

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
      <ChoiceInput
        ref={boulderRatingRef}
        controlId="RatingInput"
        label="Rating"
        choices={Array.from(RATINGS)}
      />
      <ChoiceInput
        ref={boulderColourRef}
        controlId="ColourInput"
        label="Colour"
        choices={Array.from(COLOURS)}
      />
      <ChoiceInput
        ref={boulderBoulderTypeRef}
        controlId="BoulderTypeInput"
        label="Boulder Type"
        choices={Array.from(BOULDER_TYPE)}
      />
      <TextInput
        ref={boulderDescriptionRef}
        controlId="DescriptionInput"
        label="Description"
      />
      <DateInput
        defaultValue={convertToEditDate(currentDate())}
        ref={boulderSetStartDateRef}
        controlId="SetStartDate"
        label="Set Start Date"
      />
      <DateInput
        ref={boulderSetEndDateRef}
        controlId="SetEndDate"
        label="Set End Date"
      />
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
