import React from "react"
import {HashRouter as Router, Routes, Route} from "react-router-dom"
import Homepage from "modules/pages/homePage/homepage"
import GymPage from "modules/pages/gymPage/gymPage"
import SessionPage from "modules/pages/sessionPage/sessionPage"

import Profile from "modules/auth0/profile"
import {useAuth0} from "@auth0/auth0-react"

export default function PageRouter() {
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
          <Route exact path="/gyms" element={<GymPage />}></Route>
        )}
        {isAuthenticated && (
          <Route exact path="/sessions" element={<SessionPage />}></Route>
        )}
        {/* {!isLoading && isAuthenticated && (
          <Route path="/*" loader={() => redirect("/")} />
        )} */}
      </Routes>
    </Router>
  )
}
