import React from 'react'

const Modal = ({isOpen, onClose, children}) => {

  const handleClose = () => {
    onClose()
  }

  const handleOverlayClick = (e) => {
    // Prevent event propagation if the modal content itself is clicked
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={handleOverlayClick}></div>
      <div className="modal-content">
        <button className="modal-close" onClick={handleClose}>Close</button>
        {children}
      </div>
    </div>
  )
}

export default Modal