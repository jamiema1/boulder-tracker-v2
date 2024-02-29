import AddButtonModal from 'modules/common/components/buttons/addButtonModal'
import React from 'react'
import ClimbList from '../../components/climbsList/climbList'
import ClimbAddForm from '../../components/climbsList/components/climbAddForm'

export default function ClimbHistory({session}) {
  return (
    <div>
      <div className="flex justify-between">
        <h1>Climb History</h1>
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
