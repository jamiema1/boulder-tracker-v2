import React from "react";
import BoulderData from "./components/boulderData/BoulderData";
import Login from "./components/login/Login";
import Register from "./components/login/Register";
import Homepage from "./components/homepage/homepage";
import {HashRouter as Router, Routes, Route, Link} from "react-router-dom";
import "chart.js";

function App() {
  function logout() {
    localStorage.setItem("user", "guest");
  }

  return (
    <Router>
      <ul>
        <li>
          <Link to="/user/login">Log In</Link>
        </li>
        {/* <li>
          <Link to="/user/register">Register</Link>
        </li> */}
        {/* <li>
          <Link to="/user/:username/data">Boulder Data</Link>
        </li> */}
        <li>
          <Link to="/ " onClick={logout}>
            Log Out
          </Link>
        </li>
        <li>
          <Link to="/ " onClick={logout}>
            Home
          </Link>
        </li>
      </ul>
      <Routes>
        <Route exact path="/user/login" element={<Login />}></Route>
        <Route exact path="/user/register" element={<Register />}></Route>
        <Route
          exact
          path="/user/:username/data"
          element={<BoulderData />}
        ></Route>
        <Route exact path="/" element={<Homepage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
