import React from "react"

import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"

import images from "../../../images/images.js"

export default function EditingButtonStack({edit, resetState}) {
  return (
    <Stack direction="horizontal" gap={3}>
      <Button variant="success" onClick={edit}>
        <img src={images.confirmIcon}></img>
      </Button>
      <Button variant="danger" onClick={resetState}>
        <img src={images.cancelIcon}></img>
      </Button>
    </Stack>
  )
}
