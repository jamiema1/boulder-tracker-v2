import React, {useState} from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

export default function EndButtonModal({confirmAction, title}) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button onClick={handleShow}>End</Button>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{"Done already?"}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              confirmAction()
              handleClose()
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
