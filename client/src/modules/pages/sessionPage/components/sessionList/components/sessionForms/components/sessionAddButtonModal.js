import React, {useState} from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import SessionAddForm from "modules/pages/sessionPage/components/sessionList/components/sessionForms/sessionAddForm"

export default function SessionAddButtonModal({title}) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button onClick={handleShow}>{title}</Button>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SessionAddForm handleClose={handleClose}></SessionAddForm>
        </Modal.Body>
      </Modal>
    </>
  )
}
