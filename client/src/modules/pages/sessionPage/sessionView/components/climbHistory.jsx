import React from 'react'
import ClimbList from 'modules/pages/sessionPage/components/climbsList/climbList.jsx'
import ClimbAddForm from 'modules/pages/sessionPage/components/climbsList/components/climbAddForm.jsx'
import {useModal} from 'modules/common/components/modal/modalContext'
import Button from 'modules/common/components/buttons/button'

export default function ClimbHistory({session}) {

  // eslint-disable-next-line no-unused-vars
  const {isModalOpen, openModal, closeModal} = useModal()

  return (
    <div className='content flex-grow-[3] flex flex-col'>
      <div className="flex justify-between mb-2">
        <h1 className="m-2 pr-16">Climb History</h1>
        <Button
          text={"Add Climb"}
          isSuccess={true}
          onClick={() => openModal(
            <ClimbAddForm session={session} handleClose={closeModal}/>
          )}
        />
      </div>
      <div className="flex flex-col h-[78vh] overflow-y-auto">
        <ClimbList session={session}></ClimbList>
      </div>
    </div>
  )
}
