import AddButtonModal from 'modules/common/components/buttons/addButtonModal'
import React from 'react'
import ClimbList from './climbsList/climbList'
import ClimbAddForm from './climbsList/components/climbAddForm'

export default function SessionView({session}) {
  return (
    <div>
      <div className="flex justify-between">
        <h2>Climbs</h2>
        <AddButtonModal
          title={"Add Climb"}
          form={<ClimbAddForm session={session}></ClimbAddForm>}
        ></AddButtonModal>
      </div>
      <div className="flex flex-col h-[67vh] overflow-y-auto">
        <ClimbList session={session}></ClimbList>
      </div>
    </div>
  )
}
