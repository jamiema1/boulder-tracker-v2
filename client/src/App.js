import React, {useState} from "react"
import {HashRouter as Router, Routes, Route, Link} from "react-router-dom"
import Homepage from "./pages/homepage"
import GymPage from "./pages/gymPage"
import SessionPage from "./pages/sessionPage"
import "./App.css"
import "./pages/gymPage.css"
import "./pages/gymPageMobile.css"

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
    <Router>
      <ul className="pages">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sessions">Sessions</Link>
        </li>
        <li>
          <Link to="/gyms">Gyms</Link>
        </li>
      </ul>
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route
          exact
          path="/gyms"
          element={
            <GymPage
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
            />
          }
        ></Route>
        <Route
          exact
          path="/sessions"
          element={
            <SessionPage
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
            />
          }
        ></Route>
      </Routes>
    </Router>
  )
}

export default App
