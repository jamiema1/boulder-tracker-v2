// import React, {useState} from "react"
import React from "react"
import Link from "./link"

function NavBar() {
  return (
    <div className="flex p-8 justify-around">
      <Link title="Home" path="#/"/>
      <Link title="Sessions" path="#/sessions"/>
      <Link title="Gyms" path="#/gyms"/>
      <Link title="Dashboard" path="#/dashboard"/>
    </div>
  )
}

export default NavBar
