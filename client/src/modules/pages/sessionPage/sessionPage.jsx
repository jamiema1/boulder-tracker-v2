import React from "react"

import SessionCalendar from "modules/pages/sessionPage/components/sessionCalendar"
import SessionInfo from "modules/pages/sessionPage/components/sessionInfo"
import SessionList from "modules/pages/sessionPage/sessionList/sessionList"

export default function SessionPage() {
  return (
    <div className="flex">
      <div className="flex-grow flex flex-col">
        <SessionCalendar />
        <div>
          <SessionList />
        </div>
      </div>
      <div className="flex-grow-[5]">
        <SessionInfo />
      </div>
    </div>
  )
}
