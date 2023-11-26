import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const SessionUserIdInput = forwardRef(function SessionUserIdInput(
  {defaultValue = 0, disabled = false},
  ref
) {
  return (
    <FloatingLabel controlId="UserIDInput" label="User" className="mb-3">
      <Form.Control
        type="number"
        ref={ref}
        placeholder={1}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </FloatingLabel>
  )
})

export default SessionUserIdInput
