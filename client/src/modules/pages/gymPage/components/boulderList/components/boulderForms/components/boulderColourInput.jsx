import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const COLOURS = new Map([
  ["Black", "Black"],
  ["Blue", "Blue"],
  ["Green", "Green"],
  ["Orange", "Orange"],
  ["Pink", "Pink"],
  ["Purple", "Purple"],
  ["Red", "Red"],
  ["White", "White"],
  ["Yellow", "Yellow"],
])

const BoulderColourInput = forwardRef(function BoulderColourInput(
  {defaultValue = 0, disabled = false},
  ref
) {
  return (
    <FloatingLabel controlId="ColourInput" label="Colour" className="mb-3">
      <Form.Select ref={ref} defaultValue={defaultValue} disabled={disabled}>
        {Array.from(COLOURS).map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  )
})

export default BoulderColourInput
