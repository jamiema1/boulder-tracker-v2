import AddButtonModal from 'modules/common/components/buttons/addButtonModal'
import React from 'react'
import SessionAddForm from '../sessionList/components/sessionAddForm'

export default function SessionNew() {
  return (
    <div className='flex flex-col m-8 rounded-3xl bg-customPrimary'>
      <h1>New Session</h1>
      <div>
        <AddButtonModal
          title={"Add Session"}
          form={<SessionAddForm></SessionAddForm>}
        ></AddButtonModal>
      </div>
    </div>
  )
}
