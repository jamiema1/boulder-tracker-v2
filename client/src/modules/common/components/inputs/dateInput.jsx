import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

import {nullDate} from "modules/common/helpers"

const DateInput = forwardRef(function DateInput(
  {defaultValue = nullDate, disabled = false, controlId = "", label = ""},
  ref
) {
  return (
    <FloatingLabel controlId={controlId} label={label} className="mb-3">
      <Form.Control
        type="date"
        ref={ref}
        placeholder={defaultValue}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </FloatingLabel>
  )
})

export default DateInput
