import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const BoulderDescriptionInput = forwardRef(function BoulderDescriptionInput(
  {defaultValue = "", disabled = false},
  ref
) {
  return (
    <FloatingLabel
      controlId="DescriptionInput"
      label="Description"
      className="mb-3"
    >
      <Form.Control
        type="text"
        ref={ref}
        placeholder={defaultValue}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </FloatingLabel>
  )
})

export default BoulderDescriptionInput
