import React from "react"
import SessionList from "./sessionList/sessionList"
import SessionAddForm from "./sessionList/components/sessionAddForm"
import Button from "modules/common/components/buttons/button"
import {useModal} from "modules/common/components/modal/modalContext"

export default function SessionHistory() {

  // eslint-disable-next-line no-unused-vars
  const {isModalOpen, openModal, closeModal} = useModal()

  return (
    <div>
      <div className="flex justify-between mb-2">
        <h1 className="m-2 pr-16">Session History</h1>
        <Button
          text={"Add Session"}
          isSuccess={true}
          onClick={() => openModal(
            <SessionAddForm handleClose={closeModal}/>
          )}
        />
      </div>
      <div className="flex flex-col h-[78vh] overflow-y-auto">
        <SessionList />
      </div>
    </div>
  )
}
