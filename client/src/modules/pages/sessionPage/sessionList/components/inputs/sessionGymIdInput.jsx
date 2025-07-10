import React, {forwardRef} from "react"

import {useQuery} from "react-query"

import axios from "modules/api/axios"
import {gymEndpoint} from "modules/api/endpoints"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const SessionGymIdInput = forwardRef(function SessionGymIdInput(
  {defaultValue = 0, disabled = false},
  ref
) {
  const {isLoading: isLoadingGym, data: allGymData} = useQuery(
    gymEndpoint,
    () => axios.get(gymEndpoint)
  )

  // TODO: Make the loading look nicer
  if (isLoadingGym) {
    return <div>Loading...</div>
  }

  return (
    <FloatingLabel controlId="GymIDInput" label="Gym" className="mb-3">
      <Form.Select ref={ref} defaultValue={defaultValue} disabled={disabled}>
        {allGymData.data.data.map((gym) => (
          <option key={gym.id} value={gym.id}>
            {gym.city}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  )
})

export default SessionGymIdInput
