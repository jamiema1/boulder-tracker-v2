import React from 'react'
import {useModal} from './modalContext'

export default function Modal() {
  
  // eslint-disable-next-line no-unused-vars
  const {isModalOpen, closeModal, modalContent} = useModal()

  if (!isModalOpen || !modalContent) return null

  return (
    <div onClick={(e) => e.stopPropagation()} 
      className='fixed inset-0 z-[1] bg-black bg-opacity-50 
        flex justify-center items-center'>
      <div className='content'>
        {/* <div className='flex justify-end pb-2'>
          <button onClick={closeModal}>Close</button>
        </div> */}
        {modalContent}
      </div>
    </div>
  )
}
