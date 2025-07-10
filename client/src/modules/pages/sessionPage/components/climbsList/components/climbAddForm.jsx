import React, {useRef, useState} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import axios from "modules/api/axios"
import {climbEndpoint, handleError} from "modules/api/endpoints"

import {convertToEditDateTime, currentDateTime} from "modules/common/helpers"
import AddingButtonStack from "modules/common/components/buttons/addingButtonStack"

import ClimbBoulderIdInput from "modules/pages/sessionPage/components/climbsList/components/inputs/climbBoulderIdInput"
import ClimbLocationIdInput from "modules/pages/sessionPage/components/climbsList/components/inputs/climbLocationIdInput"
import AddButtonModal from "modules/common/components/buttons/addButtonModal"
import BoulderAddForm from "modules/pages/gymPage/boulderList/components/boulderAddForm"
import DateTimeInput from "modules/common/components/inputs/dateTimeInput"
import NumberInput from "modules/common/components/inputs/numberInput"

export default function ClimbAddForm({handleClose, session}) {
  /*
   * React Hooks:
   *
   * Refs:
   *  - newBoulderId: reference to new boulder ID
   *  - newClimbStartTime: reference to new start time
   *  - newClimbEndTime: reference to new end time
   */

  const [locationId, setlocationId] = useState(0)

  const locationIdRef = useRef(0)
  const boulderIdRef = useRef(0)
  const attemptsRef = useRef(0)
  const sendsRef = useRef(0)
  const climbStartTimeRef = useRef("")
  const climbEndTimeRef = useRef("")

  const queryClient = useQueryClient()

  const {isLoading: isLoadingClimb, data: allClimbData} = useQuery(
    climbEndpoint,
    () => axios.get(climbEndpoint),
    {
      onError: (error) => handleError(error),
    }
  )

  const addClimb = useMutation(
    (newSession) => axios.post(climbEndpoint, newSession),
    {
      onSuccess: (data, newSession) => {
        queryClient.setQueryData(climbEndpoint, {
          data: {
            data: [
              ...allClimbData.data.data,
              {id: data.data.data[0].id, ...newSession},
            ],
          },
        })
      },

      onError: (error) => handleError(error),
    }
  )

  if (isLoadingClimb) {
    return <div>Loading...</div>
  }

  return (
    <form>
      <ClimbLocationIdInput
        ref={locationIdRef}
        session={session}
        updateLocationId={() => {
          setlocationId(locationIdRef.current.value)
        }}
      ></ClimbLocationIdInput>
      <ClimbBoulderIdInput
        ref={boulderIdRef}
        session={session}
        locationId={locationId}
      ></ClimbBoulderIdInput>
      <AddButtonModal
        title={"Add Boulder"}
        form={
          <BoulderAddForm
            location={{id: locationId, gymId: session.gymId, name: ""}}
          />
        }
      />
      <NumberInput
        defaultValue={1}
        ref={attemptsRef}
        controlId="AttemptInput"
        label="Attempts"
      />
      <NumberInput
        defaultValue={1}
        ref={sendsRef}
        controlId="SendInput"
        label="Sends"
      />
      
      <DateTimeInput
        defaultValue={convertToEditDateTime(currentDateTime())}
        ref={climbStartTimeRef}
        controlId="StartTimeInput"
        label="Start Time"
      />
          
      <DateTimeInput
        defaultValue={convertToEditDateTime(currentDateTime())}
        ref={climbEndTimeRef}
        controlId="EndTimeInput"
        label="End Time"
      />
          
      <AddingButtonStack
        confirm={() => {
          handleClose()
          addClimb.mutate({
            boulderId: parseInt(boulderIdRef.current.value),
            sessionId: parseInt(session.id),
            attempts: parseInt(attemptsRef.current.value),
            sends: parseInt(sendsRef.current.value),
            climbStartTime: climbStartTimeRef.current.value,
            climbEndTime: climbEndTimeRef.current.value,
          })
        }}
        cancel={() => {
          handleClose()
        }}
      />
    </form>
  )
}
