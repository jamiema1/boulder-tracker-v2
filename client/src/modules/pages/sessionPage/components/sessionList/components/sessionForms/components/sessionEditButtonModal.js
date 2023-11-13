import React, {useState} from "react"

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import SessionEditForm from "../sessionEditForm"
import images from "modules/images/images"

export default function SessionEditButtonModal({session, title}) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        <img src={images.editIcon}></img>
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SessionEditForm
            session={session}
            handleClose={handleClose}
          ></SessionEditForm>
        </Modal.Body>
      </Modal>
    </>
  )
}
