import React, {useRef} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Form from "react-bootstrap/Form"

import axios from "modules/api/axios"
import {boulderEndpoint, handleError} from "modules/api/endpoints"

import {convertToEditDate, nullDate} from "modules/common/helpers"
import EditingButtonStack from "modules/common/components/editingButtonStack"
import BoulderSetStartDateInput from "./components/boulderSetStartDateInput"
import BoulderSetEndDateInput from "./components/boulderSetEndDateInput"
import BoulderRatingInput from "./components/boulderRatingInput"
import BoulderColourInput from "./components/boulderColourInput"
import BoulderBoulderTypeInput from "./components/boulderBoulderTypeInput"
import BoulderDescriptionInput from "./components/boulderDescriptionInput"

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
      <BoulderRatingInput
        ref={boulderRatingRef}
        defaultValue={boulder.rating}
      />
      <BoulderColourInput
        ref={boulderColourRef}
        defaultValue={boulder.colour}
      />
      <BoulderBoulderTypeInput
        ref={boulderBoulderTypeRef}
        defaultValue={boulder.boulderType}
      />
      <BoulderDescriptionInput
        ref={boulderDescriptionRef}
        defaultValue={boulder.description}
      />
      <BoulderSetStartDateInput
        ref={boulderSetStartDateRef}
        defaultValue={convertToEditDate(boulder.setStartDate)}
      />
      <BoulderSetEndDateInput
        ref={boulderSetEndDateRef}
        defaultValue={convertToEditDate(boulder.setEndDate)}
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
