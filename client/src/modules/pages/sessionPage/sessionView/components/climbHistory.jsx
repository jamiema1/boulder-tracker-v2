import AddButtonModal from 'modules/common/components/buttons/addButtonModal'
import React, {useState} from 'react'
import ClimbList from '../../components/climbsList/climbList'
import ClimbAddForm from '../../components/climbsList/components/climbAddForm'
import Modal from './modal'

export default function ClimbHistory({session}) {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    console.log("click")
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1>Climb History</h1>
        <button onClick={handleOpenModal}>Open Modal</button>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div>Test</div>
        </Modal>
        <AddButtonModal
          title={"Add Climb"}
          form={<ClimbAddForm session={session}></ClimbAddForm>}
        ></AddButtonModal>
      </div>
      <div className="flex flex-col h-[78vh] overflow-y-auto">
        <ClimbList session={session}></ClimbList>
      </div>
    </div>
  )
}
