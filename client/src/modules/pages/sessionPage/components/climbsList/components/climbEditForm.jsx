import React, {useRef} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import Form from "react-bootstrap/Form"

import axios from "modules/api/axios"
import {
  boulderEndpoint,
  climbEndpoint,
  handleError,
} from "modules/api/endpoints"

import {convertToEditDateTime} from "modules/common/helpers"
import EditingButtonStack from "modules/common/components/buttons/editingButtonStack"

import ClimbBoulderIdInput from "modules/pages/sessionPage/components/climbsList/components/inputs/climbBoulderIdInput"
import ClimbLocationIdInput from "modules/pages/sessionPage/components/climbsList/components/inputs/climbLocationIdInput"
import DateTimeInput from "modules/common/components/inputs/dateTimeInput"
import NumberInput from "modules/common/components/inputs/numberInput"

export default function ClimbEditForm({session, climb, handleClose}) {
  /*
   * React Hooks:
   *
   * Refs:
   *  - newBoulderId: reference to new boulder ID
   *  - newClimbStartTime: reference to new start time
   *  - newClimbEndTime: reference to new end time
   */

  // const [locationId, setlocationId] = useState(0)

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

  const {isLoading: isLoadingBoulder, data: allBoulderData} = useQuery(
    boulderEndpoint,
    () => axios.get(boulderEndpoint)
  )

  const editClimb = useMutation(
    ({climbId, newClimb}) =>
      axios.put(climbEndpoint + "/" + climbId, newClimb),
    {
      onSuccess: (data, {climbId, newClimb}) => {
        queryClient.setQueryData(climbEndpoint, {
          data: {
            data: [...allClimbData.data.data].map((climb) => {
              return climb.id === climbId ? {id: climbId, ...newClimb} : climb
            }),
          },
        })
      },
      onError: (error) => handleError(error),
    }
  )

  if (isLoadingClimb || isLoadingBoulder) {
    return <div>Loading...</div>
  }

  const locationId = [...allBoulderData.data.data].find((boulder) => {
    return boulder.id == climb.boulderId
  }).locationId

  return (
    <Form>
      <ClimbLocationIdInput
        ref={locationIdRef}
        session={session}
        updateLocationId={() => {}}
        defaultValue={locationId}
        disabled={true}
      ></ClimbLocationIdInput>
      <ClimbBoulderIdInput
        ref={boulderIdRef}
        session={session}
        locationId={locationId}
        defaultValue={climb.boulderId}
        disabled={true}
      ></ClimbBoulderIdInput>
      <NumberInput
        defaultValue={climb.attempts}
        ref={attemptsRef}
        controlId="AttemptInput"
        label="Attempts"
      />
      <NumberInput
        defaultValue={climb.sends}
        ref={sendsRef}
        controlId="SendInput"
        label="Sends"
      />
      <DateTimeInput
        defaultValue={convertToEditDateTime(climb.climbStartTime)}
        ref={climbStartTimeRef}
        controlId="StartTimeInput"
        label="Start Time"
      />
      <DateTimeInput
        defaultValue={convertToEditDateTime(climb.climbEndTime)}
        ref={climbEndTimeRef}
        controlId="EndTimeInput"
        label="End Time"
      />
      <EditingButtonStack
        confirm={() => {
          editClimb.mutate({
            climbId: climb.id,
            newClimb: {
              boulderId: parseInt(boulderIdRef.current.value),
              sessionId: parseInt(session.id),
              attempts: parseInt(attemptsRef.current.value),
              sends: parseInt(sendsRef.current.value),
              climbStartTime: climbStartTimeRef.current.value,
              climbEndTime: climbEndTimeRef.current.value,
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
