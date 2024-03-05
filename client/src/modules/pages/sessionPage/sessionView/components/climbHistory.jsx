import React from 'react'
import ClimbList from '../../components/climbsList/climbList'
import ClimbAddForm from '../../components/climbsList/components/climbAddForm'
import {useModal} from '../../../../common/components/modal/modalContext'

export default function ClimbHistory({session}) {

  const {isModalOpen, openModal} = useModal()

  console.log(isModalOpen)

  return (
    <div className='content flex-grow-[3] flex flex-col'>
      <div className="flex justify-between">
        <h1>Climb History</h1>
        <button 
          className='p-4'
          onClick={
            () => openModal(<ClimbAddForm session={session} />)
          }
        >
          Add Climb
        </button>
      </div>
      <div className="flex flex-col h-[78vh] overflow-y-auto">
        <ClimbList session={session}></ClimbList>
      </div>
    </div>
  )
}
