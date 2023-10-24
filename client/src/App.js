import React, {useState} from "react"
import {HashRouter as Router, Routes, Route} from "react-router-dom"
import Homepage from "./pages/homepage"
import GymPage from "./pages/gymPage"
import SessionPage from "./pages/sessionPage"
import "./pages/gymPage.css"
import LoginButton from "./auth0/loginButton"
import LogoutButton from "./auth0/logoutButton"
import Profile from "./auth0/profile"
import {useAuth0} from "@auth0/auth0-react"

import Button from "react-bootstrap/Button"
import Offcanvas from "react-bootstrap/Offcanvas"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"

function App() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

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
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="#" className="flex-column">
            <Nav.Link href="#" onClick={handleClose}>
              Home
            </Nav.Link>
            <Nav.Link href="#/sessions" onClick={handleClose}>
              Sessions
            </Nav.Link>
            <Nav.Link href="#/gyms" onClick={handleClose}>
              Gyms
            </Nav.Link>
            <Nav.Link href="#/dashboard" onClick={handleClose}>
              Dashboard
            </Nav.Link>
            <Nav.Link href="#/people" onClick={handleClose}>
              People
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Button onClick={handleShow}>Navigation</Button>
        </Container>
        <Container>
          <Navbar.Brand href="#">Boulder Tracker</Navbar.Brand>
          <Nav>
            {isAuthenticated && (
              <Navbar.Text>
                <div>Welcome {user.name}</div>
              </Navbar.Text>
            )}
            {isAuthenticated && (
              <Nav.Link href="#/profile">
                <img src={user.picture} alt={user.name} />
              </Nav.Link>
            )}
            {!isAuthenticated && <LoginButton></LoginButton>}
            {isAuthenticated && <LogoutButton></LogoutButton>}
          </Nav>
        </Container>
      </Navbar>
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
        {/* {!isLoading && isAuthenticated && (
          <Route path="/*" loader={() => redirect("/")} />
        )} */}
      </Routes>
    </Router>
  )
}

export default App
