import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const ClimbAttemptInput = forwardRef(function ClimbAttemptInput(
  {defaultValue = 0, disabled = false},
  ref
) {
  return (
    <FloatingLabel controlId="AttemptInput" label="Attempts" className="mb-3">
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

export default ClimbAttemptInput
