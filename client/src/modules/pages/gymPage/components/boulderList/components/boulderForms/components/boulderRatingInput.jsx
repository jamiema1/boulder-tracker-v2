import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const RATINGS = new Map([
  ["Unrated", -1],
  ["1 Hex", 1],
  ["2 Hex", 2],
  ["3 Hex", 3],
  ["4 Hex", 4],
  ["5 Hex", 5],
  ["6 Hex", 6],
])

const BoulderRatingInput = forwardRef(function BoulderRatingInput(
  {defaultValue = 0, disabled = false},
  ref
) {
  return (
    <FloatingLabel controlId="RatingInput" label="Rating" className="mb-3">
      <Form.Select ref={ref} defaultValue={defaultValue} disabled={disabled}>
        {Array.from(RATINGS).map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  )
})

export default BoulderRatingInput
