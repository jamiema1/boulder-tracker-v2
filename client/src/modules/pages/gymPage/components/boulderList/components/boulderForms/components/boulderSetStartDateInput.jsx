import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

import {nullDate} from "modules/common/helpers"

const BoulderSetStartDateInput = forwardRef(function BoulderSetStartDateInput(
  {defaultValue = nullDate, disabled = false},
  ref
) {
  return (
    <FloatingLabel
      controlId="SetStartDate"
      label="Set Start Date"
      className="mb-3"
    >
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

export default BoulderSetStartDateInput
