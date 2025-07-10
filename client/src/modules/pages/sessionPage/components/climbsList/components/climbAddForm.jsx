import React, {useRef, useState} from "react"

import {useMutation, useQuery, useQueryClient} from "react-query"

import axios from "modules/api/axios"
import {climbEndpoint, handleError} from "modules/api/endpoints"

import {convertToEditDateTime, currentDateTime} from "modules/common/helpers"

import ClimbBoulderIdInput from "modules/pages/sessionPage/components/climbsList/components/inputs/climbBoulderIdInput"
import ClimbLocationIdInput from "modules/pages/sessionPage/components/climbsList/components/inputs/climbLocationIdInput"
import AddButtonModal from "modules/common/components/buttons/addButtonModal"
import BoulderAddForm from "modules/pages/gymPage/boulderList/components/boulderAddForm"
import DateTimeInput from "modules/common/components/inputs/dateTimeInput"
import NumberInput from "modules/common/components/inputs/numberInput"
import Button from "modules/common/components/buttons/button"

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
    <div>
      <h2 className="ml-2 mb-4">
        Add Climb
      </h2>
      <form className="grid grid-cols-2 gap-4">
        <ClimbLocationIdInput
          ref={locationIdRef}
          session={session}
          updateLocationId={() => {
            setlocationId(locationIdRef.current.value)
            // TODO: jma - fix setState call when child is rendering
            // currently needed to ensure boulder input has the right locationID
          }}
        ></ClimbLocationIdInput>
        <ClimbBoulderIdInput
          ref={boulderIdRef}
          session={session}
          locationId={locationId}
        ></ClimbBoulderIdInput>
        <div className="col-span-2">
          <AddButtonModal
            title={"Add Boulder"}
            form={
              <BoulderAddForm
                location={{id: locationId, gymId: session.gymId, name: ""}}
              />
            }
          />
        </div>
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
      </form>
      <div className="flex justify-end gap-x-2">
        <Button
          text={"Add"}
          isSuccess={true}
          onClick={() => {
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
        />
        <Button
          text={"Cancel"}
          isSuccess={false}
          onClick={handleClose}
        />
      </div>
    </div>
  )
}
