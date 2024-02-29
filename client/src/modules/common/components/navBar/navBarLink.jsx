
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React from 'react'
import {Link, useLocation} from 'react-router-dom'

export default function NavBarLink({title, path, icon, location}) {

  location = useLocation()
  const active = location.pathname === path
  return (
    <div className={`flex items-center rounded-2xl p-3  
      transition duration-700 ease-in-out
     ${ active ? 'bg-customPrimary' : ''} hover:bg-customPrimary`} >
      <FontAwesomeIcon icon={icon} size="lg"/>
      <Link to={path} className='text-2xl font-semibold pl-4'>{title}</Link>
    </div>
  )
}
