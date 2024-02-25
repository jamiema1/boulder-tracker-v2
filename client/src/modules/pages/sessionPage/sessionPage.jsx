import React from "react"

import SessionList from "modules/pages/sessionPage/sessionList/sessionList"
import SessionCalendar from "modules/pages/sessionPage/sessionCalendar"

export default function SessionPage() {
  return (
    <div className="flex">
      <div className="flex-grow flex flex-col">
        <SessionCalendar />
        <div>Recent Sessions</div>
      </div>
      <div className="flex-grow-[5] bg-customSecondary">
        <SessionList />
      </div>
    </div>
  )
}
