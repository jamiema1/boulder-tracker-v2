import React from "react"
import {HashRouter as Router, Routes, Route, Link} from "react-router-dom"
import Homepage from "./pages/homepage"
import GymPage from "./pages/gymPage"
import SessionPage from "./pages/sessionPage"
import "./App.css"

function App() {
  return (
    <Router>
      <ul className="pages">
        <li>
          <Link to="/sessions">Sessions</Link>
        </li>
        <li>
          <Link to="/gyms">Gyms</Link>
        </li>
      </ul>
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route exact path="/gyms" element={<GymPage />}></Route>
        <Route exact path="/sessions" element={<SessionPage />}></Route>
      </Routes>
    </Router>
  )
}

export default App
