import React from "react"
import AddButtonModal from "modules/common/components/buttons/addButtonModal"
import SessionList from "./sessionList/sessionList"
import SessionAddForm from "./sessionList/components/sessionAddForm"

export default function SessionHistory() {
  

  return (
    <div>
      <div className="flex justify-between">
        <h1>Session History</h1>
        <AddButtonModal
          title={"Add Session"}
          form={<SessionAddForm />}
        ></AddButtonModal>
      </div>
      <div className="flex flex-col h-[78vh] overflow-y-auto">
        <SessionList />
      </div>
    </div>
  )
}
