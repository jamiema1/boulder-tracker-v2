import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const TextInput = forwardRef(function TextInput(
  {defaultValue = "", disabled = false, controlId = "", label = ""},
  ref
) {
  return (
    <FloatingLabel controlId={controlId} label={label} className="mb-3">
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

export default TextInput
