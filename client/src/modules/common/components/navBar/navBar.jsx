import React from "react"
import NavBarLink from "./navBarLink"
import {getHexImage} from "modules/images/images"

import {faClockRotateLeft, faDumbbell, faHouse} from '@fortawesome/free-solid-svg-icons'

const logo = getHexImage(1)
const profileLogo = getHexImage(1)

function NavBar() {

  return (
    <div className="flex flex-col w-64 p-8 px-16 justify-between 
    items-center bg-customLight 
    border-r border-solid border-customDark">
      <div className="flex flex-col flex-grow justify-start items-center">
        <img className="w-8 h-8 mr-4" src={logo}></img>
        <div className="font-bold text-4xl">Boulder Tracker</div>
      </div>
      <div className="flex flex-col flex-grow justify-around">
        <NavBarLink title="Home" icon={faHouse} path="/" />
        <NavBarLink title="Sessions" icon={faClockRotateLeft} path="/sessions"/>
        <NavBarLink title="Gyms" icon={faDumbbell} path="/gyms" />
        {/* <Link title="Dashboard" icon={faHouse} path="#/dashboard"/> */}
      </div>
      <div className="flex flex-col flex-grow justify-end items-center">
        <div className="font-medium text-xl">My Profile</div>
        <img className="w-8 h-8 ml-4" src={profileLogo}></img>
      </div>
    </div>
  )
}

export default NavBar
