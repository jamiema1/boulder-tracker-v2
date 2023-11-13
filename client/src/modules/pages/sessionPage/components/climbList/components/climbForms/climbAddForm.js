import React, {useRef} from "react"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import AddingButtonStack from "modules/common/components/addingButtonStack.js"
import {getCurrentDateTime} from "modules/common/helpers.js"
import ClimbLocationIdInput from "./components/climbLocationIdInput"
import {climbEndpoint, handleError} from "modules/api/endpoints"
import axios from "modules/api/axios"
import {useMutation, useQuery, useQueryClient} from "react-query"

export default function ClimbAddForm({handleClose, sessionId}) {
  /*
   * React Hooks:
   *
   * Refs:
   *  - newBoulderId: reference to new boulder ID
   *  - newClimbStartTime: reference to new start time
   *  - newClimbEndTime: reference to new end time
   */

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
      sessionId: parseInt(sessionId),
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
      <ClimbLocationIdInput ref={locationIdRef}></ClimbLocationIdInput>
      <FloatingLabel
        controlId="BoulderIDInput"
        label="Boulder"
        className="mb-3"
      >
        <Form.Select ref={boulderIdRef}>
          {boulderData.map((boulder) => (
            <option key={boulder.id} value={boulder.id}>
              {boulder.rating +
                " | " +
                boulder.colour +
                " | " +
                boulder.boulderType +
                " | " +
                boulder.description.substring(0, 25)}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="AttemptInput" label="Attempts" className="mb-3">
        <Form.Control
          type="number"
          placeholder={1}
          ref={attemptsRef}
          defaultValue={1}
        />
      </FloatingLabel>
      <FloatingLabel controlId="SendInput" label="Sends" className="mb-3">
        <Form.Control
          type="number"
          placeholder={1}
          ref={sendsRef}
          defaultValue={0}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="StartTimeInput"
        label="Start Time"
        className="mb-3"
      >
        <Form.Control
          type="datetime-local"
          placeholder={getCurrentDateTime()}
          defaultValue={getCurrentDateTime()}
          ref={climbStartTimeRef}
        />
      </FloatingLabel>
      <FloatingLabel controlId="EndTimeInput" label="End Time" className="mb-3">
        <Form.Control
          type="datetime-local"
          placeholder={getCurrentDateTime()}
          defaultValue={getCurrentDateTime()}
          ref={climbEndTimeRef}
        />
      </FloatingLabel>
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
