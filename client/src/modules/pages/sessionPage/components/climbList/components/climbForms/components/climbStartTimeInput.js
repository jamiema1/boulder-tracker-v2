import React, {forwardRef} from "react"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"

const ClimbStartTimeInput = forwardRef(function ClimbStartTimeInput(
  {defaultValue = 0, disabled = false},
  ref
) {
  return (
    <FloatingLabel
      controlId="StartTimeInput"
      label="Start Time"
      className="mb-3"
    >
      <Form.Control
        type="datetime-local"
        ref={ref}
        placeholder={defaultValue}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </FloatingLabel>
  )
})

export default ClimbStartTimeInput