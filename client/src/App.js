import React, {useState} from "react"
import {HashRouter as Router, Routes, Route, Link} from "react-router-dom"
import Homepage from "./pages/homepage"
import GymPage from "./pages/gymPage"
import SessionPage from "./pages/sessionPage"
import "./App.css"
import "./pages/gymPage.css"
import "./pages/gymPageMobile.css"
import LoginButton from "./auth0/loginButton"
import LogoutButton from "./auth0/logoutButton"
import Profile from "./auth0/profile"
import {useAuth0} from "@auth0/auth0-react"

function App() {
  const {user, isAuthenticated, loginWithRedirect} = useAuth0()

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
      <ul>
        {isAuthenticated && <div>Welcome {user.name}</div>}
        {!isAuthenticated && (
          <li>
            <LoginButton></LoginButton>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <LogoutButton></LogoutButton>
          </li>
        )}
      </ul>
      <ul className="pages">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/sessions">Sessions</Link>
        </li>
        <li>
          <Link to="/gyms">Gyms</Link>
        </li>
      </ul>
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
        )}
        {isAuthenticated && (
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
        )}
      </Routes>
    </Router>
  )
}

export default App
