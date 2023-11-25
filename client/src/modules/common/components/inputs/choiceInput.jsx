import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const ChoiceInput = forwardRef(function ChoiceInput(
  {
    defaultValue = 0,
    disabled = false,
    controlId = "",
    label = "",
    choices = [],
  },
  ref
) {
  return (
    <FloatingLabel controlId={controlId} label={label} className="mb-3">
      <Form.Select ref={ref} defaultValue={defaultValue} disabled={disabled}>
        {choices.map(([key, value]) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  )
})

export default ChoiceInput
