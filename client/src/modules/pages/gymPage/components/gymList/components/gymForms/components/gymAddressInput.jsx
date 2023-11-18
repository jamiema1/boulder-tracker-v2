import React, {forwardRef} from "react"

import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"

const GymAddressInput = forwardRef(function GymAddressInput(
  {defaultValue = "", disabled = false},
  ref
) {
  return (
    <FloatingLabel controlId="AddressInput" label="Address" className="mb-3">
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

export default GymAddressInput
