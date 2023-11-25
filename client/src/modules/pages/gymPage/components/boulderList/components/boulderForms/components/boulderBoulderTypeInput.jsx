import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const BOULDER_TYPE = new Map([
  ["Slab", "Slab"],
  ["Overhang", "Overhang"],
])

const BoulderBoulderTypeInput = forwardRef(function BoulderBoulderTypeInput(
  {defaultValue = 0, disabled = false},
  ref
) {
  return (
    <FloatingLabel
      controlId="BoulderTypeInput"
      label="Boulder Type"
      className="mb-3"
    >
      <Form.Select ref={ref} defaultValue={defaultValue} disabled={disabled}>
        {Array.from(BOULDER_TYPE).map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  )
})

export default BoulderBoulderTypeInput
