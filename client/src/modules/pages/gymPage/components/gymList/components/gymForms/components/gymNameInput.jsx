import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const GymNameInput = forwardRef(function GymNameInput(
  {defaultValue = "", disabled = false},
  ref
) {
  return (
    <FloatingLabel controlId="NameInput" label="Name" className="mb-3">
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

export default GymNameInput
