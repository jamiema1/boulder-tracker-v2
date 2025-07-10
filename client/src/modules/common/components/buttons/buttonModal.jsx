import React, {useState} from "react"

import Modal from "react-bootstrap/Modal"

export default function ButtonModal({title, form}) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{form}</Modal.Body>
    </Modal>
  )
}
