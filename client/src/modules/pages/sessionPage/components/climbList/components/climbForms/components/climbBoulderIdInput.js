import React, {forwardRef} from "react"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import {useQuery} from "react-query"
import axios from "modules/api/axios"
import {boulderEndpoint} from "modules/api/endpoints"

const ClimbBoulderIdInput = forwardRef(function ClimbBoulderIdInput(
  {defaultValue = 0, disabled = false, session, locationId},
  ref
) {
  const {isLoading: isLoadingBoulder, data: allBoulderData} = useQuery(
    boulderEndpoint,
    () => axios.get(boulderEndpoint)
  )

  // TODO: Make the loading look nicer
  if (isLoadingBoulder) {
    return <div>Loading...</div>
  }

  const filteredBoulderData = [...allBoulderData.data.data].filter(
    (boulder) => {
      const location = boulder.locationId == locationId
      const setStart =
        new Date(session.sessionStartTime) > new Date(boulder.setStartDate)
      const setEnd =
        new Date(session.sessionStartTime) < new Date(boulder.setEndDate) ||
        boulder.setEndDate == "0000-00-00"
      return location && setStart && setEnd
    }
  )

  function formatBoulderInformation(boulder) {
    const cutoffCharacters = 40
    const description =
      boulder.description == "" ? "<No Description>" : boulder.description
    const information =
      boulder.rating +
      " | " +
      boulder.colour +
      " | " +
      boulder.boulderType.substring(0, 1) +
      " | " +
      description
    if (information.length > cutoffCharacters) {
      return information
        .substring(
          0,
          cutoffCharacters - Math.min(information.length - cutoffCharacters, 3)
        )
        .concat("...")
    } else {
      return information
    }
  }

  return (
    <FloatingLabel controlId="BoulderIDInput" label="Boulder" className="mb-3">
      <Form.Select ref={ref} defaultValue={defaultValue} disabled={disabled}>
        {filteredBoulderData.map((boulder) => (
          <option key={boulder.id} value={boulder.id}>
            {formatBoulderInformation(boulder)}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  )
})

export default ClimbBoulderIdInput