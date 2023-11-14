import React, {useRef, useState} from "react"
import Form from "react-bootstrap/Form"
import AddingButtonStack from "modules/common/components/addingButtonStack.js"
import {getCurrentDateTime} from "modules/common/helpers.js"
import ClimbLocationIdInput from "./components/climbLocationIdInput"
import {climbEndpoint, handleError} from "modules/api/endpoints"
import axios from "modules/api/axios"
import {useMutation, useQuery, useQueryClient} from "react-query"
import ClimbEndTimeInput from "./components/climbEndTimeInput"
import ClimbStartTimeInput from "./components/climbStartTimeInput"
import ClimbSendInput from "./components/climbSendInput"
import ClimbAttemptInput from "./components/climbAttemptInput"
import ClimbBoulderIdInput from "./components/climbBoulderIdInput"

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

  function getNewClimb() {
    return {
      boulderId: parseInt(boulderIdRef.current.value),
      sessionId: parseInt(session.id),
      attempts: parseInt(attemptsRef.current.value),
      sends: parseInt(sendsRef.current.value),
      climbStartTime: climbStartTimeRef.current.value,
      climbEndTime: climbEndTimeRef.current.value,
    }
  }

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
        defaultValue={getCurrentDateTime()}
        ref={climbStartTimeRef}
      ></ClimbStartTimeInput>
      <ClimbEndTimeInput
        defaultValue={getCurrentDateTime()}
        ref={climbEndTimeRef}
      ></ClimbEndTimeInput>
      <AddingButtonStack
        confirm={() => {
          handleClose()
          addClimb.mutate(getNewClimb())
        }}
        cancel={() => {
          handleClose()
        }}
      ></AddingButtonStack>
    </Form>
  )
}
