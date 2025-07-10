import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const NumberInput = forwardRef(function NumberInput(
  {defaultValue = 0, disabled = false, controlId = "", label = ""},
  ref
) {
  return (
    <FloatingLabel controlId={controlId} label={label} className="mb-3">
      <Form.Control
        type="number"
        ref={ref}
        placeholder={defaultValue}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </FloatingLabel>
  )
})

export default NumberInput
