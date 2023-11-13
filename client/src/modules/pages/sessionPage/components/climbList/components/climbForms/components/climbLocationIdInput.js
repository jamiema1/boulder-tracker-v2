import React, {forwardRef} from "react"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import {useQuery} from "react-query"
import axios from "modules/api/axios"
import {locationEndpoint} from "modules/api/endpoints"

const ClimbLocationIdInput = forwardRef(function ClimbLocationIdInput(
  {defaultValue = 0, disabled = false},
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
        // onChange={(e) => getBoulders(e.target.value)}
      >
        {allLocationData.data.data.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  )
})

export default ClimbLocationIdInput
