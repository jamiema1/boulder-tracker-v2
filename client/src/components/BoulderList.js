import React from 'react'
import Boulder from './Boulder'
import Header from './Header'
import './Input.css'

export default function BoulderList({boulderList}) {
  return (
    <span className="boulderList">
      <Header />
      {boulderList.map((boulder) => {
        return <Boulder key={boulder.id} boulder={boulder} />
      })}
    </span>
  )
}
