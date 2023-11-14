import React, {forwardRef} from "react"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"

const ClimbSendInput = forwardRef(function ClimbSendInput(
  {defaultValue = 0, disabled = false},
  ref
) {
  return (
    <FloatingLabel controlId="SendInput" label="Sends" className="mb-3">
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

export default ClimbSendInput
