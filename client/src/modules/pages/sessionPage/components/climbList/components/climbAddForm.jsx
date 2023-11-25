import React, {useRef, useState} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Form from "react-bootstrap/Form"

import axios from "modules/api/axios"
import {climbEndpoint, handleError} from "modules/api/endpoints"

import {
  convertToEditDateTime,
  getCurrentDateTime,
} from "modules/common/helpers"
import AddingButtonStack from "modules/common/components/buttons/addingButtonStack"

import ClimbAttemptInput from "modules/pages/sessionPage/components/climbList/components/climbForms/components/climbAttemptInput"
import ClimbBoulderIdInput from "modules/pages/sessionPage/components/climbList/components/climbForms/components/climbBoulderIdInput"
import ClimbEndTimeInput from "modules/pages/sessionPage/components/climbList/components/climbForms/components/climbEndTimeInput"
import ClimbLocationIdInput from "modules/pages/sessionPage/components/climbList/components/climbForms/components/climbLocationIdInput"
import ClimbSendInput from "modules/pages/sessionPage/components/climbList/components/climbForms/components/climbSendInput"
import ClimbStartTimeInput from "modules/pages/sessionPage/components/climbList/components/climbForms/components/climbStartTimeInput"

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
    <Form>
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
      <ClimbAttemptInput defaultValue={1} ref={attemptsRef}></ClimbAttemptInput>
      <ClimbSendInput defaultValue={1} ref={sendsRef}></ClimbSendInput>
      <ClimbStartTimeInput
        defaultValue={convertToEditDateTime(getCurrentDateTime())}
        ref={climbStartTimeRef}
      ></ClimbStartTimeInput>
      <ClimbEndTimeInput
        defaultValue={convertToEditDateTime(getCurrentDateTime())}
        ref={climbEndTimeRef}
      ></ClimbEndTimeInput>
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
      ></AddingButtonStack>
    </Form>
  )
}
