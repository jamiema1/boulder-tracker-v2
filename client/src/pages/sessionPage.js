import React from "react"
import Sessions from "./sessionPageComponents/sessions"

export default function SessionPage(props) {
  return (
    <div>
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
