import React from "react"
import Gyms from "./components/gyms"

export default function GymPage(props) {
  return (
    <div className="page">
      <div className="pageTitle">Gyms</div>
      <Gyms
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
      ></Gyms>
    </div>
  )
}
