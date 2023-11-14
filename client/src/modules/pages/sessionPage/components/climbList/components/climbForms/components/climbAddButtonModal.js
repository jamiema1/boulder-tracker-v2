import React, {useState} from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import ClimbAddForm from "modules/pages/sessionPage/components/climbList/components/climbForms/climbAddForm"

export default function ClimbAddButtonModal({title, session}) {
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
          <ClimbAddForm
            handleClose={handleClose}
            session={session}
          ></ClimbAddForm>
        </Modal.Body>
      </Modal>
    </>
  )
}
