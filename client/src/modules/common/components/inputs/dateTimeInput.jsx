import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

import {nullDateTime} from "modules/common/helpers"

const DateTimeInput = forwardRef(function DateInput(
  {defaultValue = nullDateTime, disabled = false, controlId = "", label = ""},
  ref
) {
  return (
    <FloatingLabel controlId={controlId} label={label} className="mb-3">
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

export default DateTimeInput
