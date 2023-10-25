import React from "react"
import {HashRouter as Router, Routes, Route} from "react-router-dom"
import Homepage from "./pages/homepage"
import GymPage from "./pages/gymPage"
import SessionPage from "./pages/sessionPage"

import Profile from "./auth0/profile"
import {useAuth0} from "@auth0/auth0-react"

export default function PageRouter(props) {
  const {isAuthenticated, loginWithRedirect} = useAuth0()

  return (
    <Router>
      <Routes>
        {!isAuthenticated && (
          <Route
            path="/*"
            Component={() => {
              loginWithRedirect()
              return null
            }}
          ></Route>
        )}
        <Route exact path="/" element={<Homepage />}></Route>
        {isAuthenticated && (
          <Route exact path="/profile" element={<Profile />}></Route>
        )}
        {isAuthenticated && (
          <Route
            exact
            path="/gyms"
            element={
              <GymPage
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
              />
            }
          ></Route>
        )}
        {isAuthenticated && (
          <Route
            exact
            path="/sessions"
            element={
              <SessionPage
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
              />
            }
          ></Route>
        )}
        {/* {!isLoading && isAuthenticated && (
          <Route path="/*" loader={() => redirect("/")} />
        )} */}
      </Routes>
    </Router>
  )
}
