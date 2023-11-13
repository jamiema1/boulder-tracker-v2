import React, {forwardRef} from "react"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"

const SessionUserIdInput = forwardRef(function SessionUserIdInput(
  {defaultValue, disabled},
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
