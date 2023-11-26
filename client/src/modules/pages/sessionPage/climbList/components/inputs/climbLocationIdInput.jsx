import React, {forwardRef} from "react"

import {useQuery} from "react-query"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

import axios from "modules/api/axios"
import {locationEndpoint} from "modules/api/endpoints"

const ClimbLocationIdInput = forwardRef(function ClimbLocationIdInput(
  {defaultValue = 0, disabled = false, session, updateLocationId},
  ref
) {
  const {isLoading: isLoadingLocation, data: allLocationData} = useQuery(
    locationEndpoint,
    () => axios.get(locationEndpoint)
  )

  // TODO: Make the loading look nicer
  if (isLoadingLocation) {
    return <div>Loading...</div>
  }

  // Initialize the location to be the first item by default
  updateLocationId()

  const filteredLocationData = [...allLocationData.data.data].filter(
    (location) => location.gymId == session.gymId
  )

  return (
    <FloatingLabel
      controlId="LocationIDInput"
      label="Location"
      className="mb-3"
    >
      <Form.Select
        ref={ref}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={updateLocationId}
      >
        {filteredLocationData.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  )
})

export default ClimbLocationIdInput
