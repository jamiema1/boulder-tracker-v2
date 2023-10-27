import React from "react"
import Gyms from "./gymPageComponents/gyms"

export default function GymPage(props) {
  return (
    <div>
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
