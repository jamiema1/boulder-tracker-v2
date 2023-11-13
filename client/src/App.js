import React, {useState} from "react"

import NavBar from "./modules/navbar/components/navBar"
import PageRouter from "./pageRouter"

function App() {
  /*
   * Centralized data
   */

  const [gymDataCentral, setGymDataCentral] = useState([])
  const [locationDataCentral, setLocationDataCentral] = useState([])
  const [boulderDataCentral, setBoulderDataCentral] = useState([])
  const [climbDataCentral, setClimbDataCentral] = useState([])
  const [sessionDataCentral, setSessionDataCentral] = useState([])

  return (
    <>
      <NavBar></NavBar>
      <PageRouter
        sessionDataCentral={sessionDataCentral}
        setSessionDataCentral={setSessionDataCentral}
        gymDataCentral={gymDataCentral}
        setGymDataCentral={setGymDataCentral}
        locationDataCentral={locationDataCentral}
        setLocationDataCentral={setLocationDataCentral}
        boulderDataCentral={boulderDataCentral}
        setBoulderDataCentral={setBoulderDataCentral}
        climbDataCentral={climbDataCentral}
        setClimbDataCentral={setClimbDataCentral}
      ></PageRouter>
    </>
  )
}

export default App
