import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const GymCityInput = forwardRef(function GymCityInput(
  {defaultValue = "", disabled = false},
  ref
) {
  return (
    <FloatingLabel controlId="CityInput" label="City" className="mb-3">
      <Form.Control
        type="text"
        ref={ref}
        placeholder={defaultValue}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </FloatingLabel>
  )
})

export default GymCityInput
