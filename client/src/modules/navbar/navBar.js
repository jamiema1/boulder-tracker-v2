import React, {useState} from "react"
import Offcanvas from "react-bootstrap/Offcanvas"
import Nav from "react-bootstrap/Nav"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"

import LoginButton from "../../auth0/loginButton"
import LogoutButton from "../../auth0/logoutButton"
import {useAuth0} from "@auth0/auth0-react"

function NavBar() {
  const [show, setShow] = useState(false)
  const [pageName, setPageName] = useState("Home")

  const handleClose = (pageName) => {
    setShow(false)
    setPageName(pageName)
  }
  const handleShow = () => {
    setShow(true)
    setPageName(pageName)
    // console.log(window.location.href)
  }

  const {user, isAuthenticated} = useAuth0()

  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="#/" className="flex-column">
            <Nav.Link href="#/" onClick={() => handleClose("Home")}>
              Home
            </Nav.Link>
            <Nav.Link href="#/sessions" onClick={() => handleClose("Sessions")}>
              Sessions
            </Nav.Link>
            <Nav.Link href="#/gyms" onClick={() => handleClose("Gyms")}>
              Gyms
            </Nav.Link>
            <Nav.Link
              href="#/dashboard"
              onClick={() => handleClose("Dashboard")}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link href="#/people" onClick={() => handleClose("People")}>
              People
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Button onClick={handleShow}>Nav</Button>
          <div>{pageName}</div>
        </Container>
        <Container>
          <Navbar.Brand href="#/">Boulder Tracker</Navbar.Brand>
          <Nav>
            {/* {isAuthenticated && (
              <Navbar.Text>
                <div>Welcome {user.name}</div>
              </Navbar.Text>
            )} */}
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
    </>
  )
}

export default NavBar
