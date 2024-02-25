// import React, {useState} from "react"
import React from "react"
import Link from "./link"
import {getHexImage} from "modules/images/images"

const logo = getHexImage(1)
const profileLogo = getHexImage(1)

function NavBar() {
  return (
    <div className="flex p-8 px-16 justify-between items-center
     bg-customPrimary">
      <div className="flex flex-grow justify-start items-center">
        <img className="w-8 h-8 mr-4" src={logo}></img>
        <div className="font-bold text-4xl">Boulder Tracker</div>
      </div>
      <div className="flex flex-grow justify-around">
        <Link title="Home" path="#/"/>
        <Link title="Sessions" path="#/sessions"/>
        <Link title="Gyms" path="#/gyms"/>
        <Link title="Dashboard" path="#/dashboard"/>
      </div>
      <div className="flex flex-grow justify-end items-center">
        <div className="font-medium text-xl">My Profile</div>
        <img className="w-8 h-8 ml-4" src={profileLogo}></img>
      </div>
    </div>
  )
}

export default NavBar
