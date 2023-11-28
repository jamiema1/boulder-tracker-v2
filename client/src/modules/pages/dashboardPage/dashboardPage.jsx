import React from "react"

import Calendar from "modules/pages/dashboardPage/calendar"
import SessionLengthLineGraph from "modules/pages/dashboardPage/sessionLengthLineGraph"
import SessionClimbsAttemptsSendsLineGraph from "modules/pages/dashboardPage/sessionClimbsAttemptsSendsLineGraph"
import SessionGymDoughnutGraph from "modules/pages/dashboardPage/sessionGymDoughnutGraph"

export default function DashboardPage() {
  return (
    <div className="page">
      <div className="pageTitle">Dashboard</div>
      <Calendar />
      <SessionLengthLineGraph />
      <SessionClimbsAttemptsSendsLineGraph />
      <SessionGymDoughnutGraph />
    </div>
  )
}
