import images from "modules/images/images"
import React, {useState} from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

export default function EditButtonModal({title, form}) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const newForm = {...form, props: {...form.props, handleClose}}

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        <img src={images.editIcon}></img>
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{newForm}</Modal.Body>
      </Modal>
    </>
  )
}
