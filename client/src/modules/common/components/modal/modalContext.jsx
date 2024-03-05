// ModalContext.js
import React, {createContext, useContext, useState} from 'react'

const ModalContext = createContext()

export const useModal = () => useContext(ModalContext) 

export function ModalProvider({children}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  const openModal = (content) => {
    setModalContent(content) // Set modal content
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <ModalContext.Provider 
      value={{isModalOpen, openModal, closeModal, modalContent}}
    > 
      {children}
    </ModalContext.Provider>
  )
}
