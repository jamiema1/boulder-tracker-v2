import React from "react"

import {HashRouter as Router, Routes, Route} from "react-router-dom"

import {useAuth0} from "@auth0/auth0-react"

// import Profile from "modules/common/components/auth0/profile"
import GymPage from "modules/pages/gymPage/gymPage"
import Homepage from "modules/pages/homePage/homepage"
import SessionPage from "modules/pages/sessionPage/sessionPage"
// import DashboardPage from "modules/pages/dashboardPage/dashboardPage"

import NavBar from "./navBar/navBar"
import SessionView from "modules/pages/sessionPage/sessionView/sessionView"

export default function PageRouter() {
  const {isAuthenticated, loginWithRedirect} = useAuth0()


  return (

    <Router>
      <div className="flex h-screen">
        <NavBar />
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
          {/* {isAuthenticated && (
          <Route exact path="/profile" element={<Profile />}></Route>
        )} */}
          {isAuthenticated && (
            <Route exact path="/gyms" element={<GymPage />}></Route>
          )}
          {isAuthenticated && (
            <Route exact path="/sessions" element={<SessionPage />}></Route>
          )}
          {isAuthenticated && (
            <Route path="/sessions/*" element={<SessionView />}></Route>
          )}
          {/* {isAuthenticated && (
          <Route exact path="/dashboard" element={<DashboardPage />}></Route>
        )} */}
          {/* {!isLoading && isAuthenticated && (
          <Route path="/*" loader={() => redirect("/")} />
        )} */}
        </Routes>
      </div>
    </Router>
  )
}
