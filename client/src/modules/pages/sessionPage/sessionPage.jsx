import React from "react"

import SessionList from "modules/pages/sessionPage/sessionList/sessionList"
import SessionCalendar from "modules/pages/sessionPage/sessionCalendar"

export default function SessionPage() {
  return (
    <div className="page">
      <div className="pageTitle">Sessions</div>
      <SessionCalendar />
      <SessionList />
    </div>
  )
}
