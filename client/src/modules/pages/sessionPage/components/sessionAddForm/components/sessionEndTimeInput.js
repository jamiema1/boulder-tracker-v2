import React, {forwardRef} from "react"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"

const SessionEndTimeInput = forwardRef(function SessionEndTimeInput(
  {defaultValue, disabled},
  ref
) {
  return (
    <FloatingLabel controlId="EndTimeInput" label="End Time" className="mb-3">
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

export default SessionEndTimeInput
