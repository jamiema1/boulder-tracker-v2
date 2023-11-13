import React from "react"

import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"

import images from "../../../images/images.js"

export default function AddingButtonStack({add, clearRefs}) {
  return (
    <Stack direction="horizontal" gap="3">
      <Button variant="success" onClick={add}>
        <img src={images.addIcon}></img>
      </Button>
      <Button variant="danger" onClick={clearRefs}>
        <img src={images.cancelIcon}></img>
      </Button>
    </Stack>
  )
}
