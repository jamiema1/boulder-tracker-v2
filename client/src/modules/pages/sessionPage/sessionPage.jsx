import React from "react"

import SessionList from "modules/pages/sessionPage/components/sessionList/sessionList"

export default function SessionPage() {
  return (
    <div className="page">
      <div className="pageTitle">Sessions</div>
      <SessionList></SessionList>
    </div>
  )
}
