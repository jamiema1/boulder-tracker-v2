import React, {useRef} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Form from "react-bootstrap/Form"

import axios from "modules/api/axios"
import {boulderEndpoint, handleError} from "modules/api/endpoints"

import {BOULDER_TYPE, COLOURS, RATINGS} from "modules/common/constants"
import {convertToEditDate, nullDate} from "modules/common/helpers"
import DateInput from "modules/common/components/inputs/dateInput"
import TextInput from "modules/common/components/inputs/textInput"
import ChoiceInput from "modules/common/components/inputs/choiceInput"
import EditingButtonStack from "modules/common/components/buttons/editingButtonStack"

export default function BoulderEditForm({location, boulder, handleClose}) {
  /*
   * React Hooks:
   *
   * Refs:
   *  - newBoulderId: reference to new boulder ID
   *  - newBoulderStartTime: reference to new start time
   *  - newBoulderEndTime: reference to new end time
   */

  // const [locationId, setlocationId] = useState(0)

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

  const editBoulder = useMutation(
    ({boulderId, newBoulder}) =>
      axios.put(boulderEndpoint + "/" + boulderId, newBoulder),
    {
      onSuccess: (data, {boulderId, newBoulder}) => {
        queryClient.setQueryData(boulderEndpoint, {
          data: {
            data: [...allBoulderData.data.data].map((boulder) => {
              return boulder.id === boulderId
                ? {id: boulderId, ...newBoulder}
                : boulder
            }),
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
        defaultValue={boulder.rating}
        controlId="RatingInput"
        label="Rating"
        choices={Array.from(RATINGS)}
      />
      <ChoiceInput
        ref={boulderColourRef}
        defaultValue={boulder.colour}
        controlId="ColourInput"
        label="Colour"
        choices={Array.from(COLOURS)}
      />
      <ChoiceInput
        ref={boulderBoulderTypeRef}
        defaultValue={boulder.boulderType}
        controlId="BoulderTypeInput"
        label="Boulder Type"
        choices={Array.from(BOULDER_TYPE)}
      />
      <TextInput
        ref={boulderDescriptionRef}
        defaultValue={boulder.description}
        controlId="DescriptionInput"
        label="Description"
      />
      <DateInput
        defaultValue={convertToEditDate(boulder.setStartDate)}
        ref={boulderSetStartDateRef}
        controlId="SetStartDate"
        label="Set Start Date"
      />
      <DateInput
        defaultValue={convertToEditDate(boulder.setEndDate)}
        ref={boulderSetEndDateRef}
        controlId="SetEndDate"
        label="Set End Date"
      />

      <EditingButtonStack
        confirm={() => {
          editBoulder.mutate({
            boulderId: boulder.id,
            newBoulder: {
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
