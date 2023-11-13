import React, {forwardRef} from "react"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"

const sessionUserIdInput = forwardRef(function sessionUserIdInput(
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

export default sessionUserIdInput
