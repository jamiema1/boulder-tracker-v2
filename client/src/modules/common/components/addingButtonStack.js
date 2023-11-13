import React from "react"

import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"

import images from "modules/images/images.js"

export default function AddingButtonStack({confirm, cancel}) {
  return (
    <Stack direction="horizontal" gap="3">
      <Button variant="success" onClick={confirm}>
        <img src={images.addIcon}></img>
      </Button>
      <Button variant="danger" onClick={cancel}>
        <img src={images.cancelIcon}></img>
      </Button>
    </Stack>
  )
}
