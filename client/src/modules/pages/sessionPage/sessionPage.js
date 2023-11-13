import React from "react"
import Sessions from "./components/sessionList"

export default function SessionPage(props) {
  return (
    <div className="page">
      <div className="pageTitle">Sessions</div>
      <Sessions
        sessionDataCentral={props.sessionDataCentral}
        setSessionDataCentral={props.setSessionDataCentral}
        gymDataCentral={props.gymDataCentral}
        setGymDataCentral={props.setGymDataCentral}
        locationDataCentral={props.locationDataCentral}
        setLocationDataCentral={props.setLocationDataCentral}
        boulderDataCentral={props.boulderDataCentral}
        setBoulderDataCentral={props.setBoulderDataCentral}
        climbDataCentral={props.climbDataCentral}
        setClimbDataCentral={props.setClimbDataCentral}
      ></Sessions>
    </div>
  )
}
